import React, {Fragment} from "react";
import Geocode from "react-geocode";
import { Spinner } from 'react-bootstrap';

import {
  GoogleMap,
  useLoadScript,
  DistanceMatrixService,
  Marker,
  DirectionsRenderer,
  DirectionsService
} from "@react-google-maps/api";


import MapDirectionsRenderer from './Directions';
import Distance from './Distance'
import Locate from './Locate';
import SearchStart from './SearchStart';
import SearchDestination from './SearchDestination';


import "../styles/map.css";
import mapStyles from "../styles/mapStyles"

const libraries = ["places"];
const mapContainerStyle = {
  height: "60vh",
  width: "50vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};
//temporary data for directions


Geocode.setApiKey("");


export default function Map(props) {

  const {travelTD, settravelTD}  = props;

  const [markers, setMarkers] = React.useState([]);
  const [startAddress, setstartAddress] = React.useState("");

  const [loadedOnce, setloadedOnce] = React.useState(false)

  // Directions State
  const[response, setResponse] = React.useState(null);
  const[travelMode, setTravelMode] = React.useState("WALKING");

  const[origin, setOrigin] = React.useState({lat:43.6453, lng:-79.3806});
  const[destination, setDestination] = React.useState({lat:43.6706, lng:-79.3865});

  const places = [
    {latitude: origin.lat, longitude: origin.lng},
    {latitude: destination.lat, longitude: destination.lng},
  ]
  
  console.log('places', places)
  console.log('map loaded')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const directionsCallback = response => {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('response: ', response)
      }
    }
  }

  const onMapClick = React.useCallback((e) => {
    setMarkers(() => [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const setMarker = React.useCallback((lat, lng)=> {
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
  }, []);

  const getAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        setstartAddress(address)
        console.log(startAddress)
      },
      error => {
        console.error(error);
      }
    );
  }

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    console.log("Inside onmapload")
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    console.log('inside panTo')
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarkers(() => [
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      }
    ]);
    getAddress(lat, lng)
  }, []);

  console.log('origin', origin)
  console.log('destinations', destination)

  if (!isLoaded) return <Spinner animation="border" variant="secondary" />;

  return (
    <div>
      <div className = "searchArea">
        <Locate panTo={panTo} setOrigin = {setOrigin}/>
        <SearchStart panTo={panTo} startAddress = {startAddress} setOrigin = {setOrigin} loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce} />
      </div>
      <div className = "destinationArea"> 
        <SearchDestination panTo={panTo} destination = {destination} setDestination = {setDestination} loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce}/> 
      </div>

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
        <MapDirectionsRenderer places = {places} travelMode = "DRIVING" loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce}/>
        {destination && origin && <Distance setstartAddress = {setstartAddress} loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce} destination = {destination} origin = {origin} settravelTD = {(time, distance)=> {
          settravelTD({
            ...travelTD,
            time,
            distance
          })
        }}/> }
      </GoogleMap>
    </div>
  );
}
