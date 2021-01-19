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


Geocode.setApiKey("AIzaSyCgMJQZ417QjfxE0y49h3P0UZPGBz-QU5A");


export default function Map(props) {

  const {travelTD, settravelTD}  = props;

  const [markers, setMarkers] = React.useState([]);

  const [startAddress, setstartAddress] = React.useState("");

  // Directions State
  const[response, setResponse] = React.useState(null);
  const[travelMode, setTravelMode] = React.useState("WALKING");

  const[origin, setOrigin] = React.useState({lat:1.291692, lng:103.780267});
  const[destination, setDestination] = React.useState({lat:1.296788, lng:103.778961});

  const places = [
    {latitude: origin.lat, longitude: origin.lng},
    {latitude: destination.lat, longitude: destination.lng},
  ]
  
  console.log(places)
  console.log('map loaded')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCgMJQZ417QjfxE0y49h3P0UZPGBz-QU5A",
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

  const getOrigin = ref => {
    setOrigin(ref);
  }

  const getDestination = ref => {
    setDestination(ref);
  }

  const onClicksetOriginDestination = () => {
    if (origin.value !== '' && destination.value !== '') {
      setOrigin(origin.value)
      setDestination(destination.value)
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

  if (!isLoaded) return <Spinner animation="border" variant="secondary" />;

  return (
    <div>
      <div className = "searchArea">
        <Locate panTo={panTo} />
        <SearchStart panTo={panTo} startAddress = {startAddress} />
      </div>
      <div className = "destinationArea"> 
        <SearchDestination panTo={panTo} /> 
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
        <MapDirectionsRenderer places = {places} travelMode = "DRIVING"/>
        {destination && origin && <Distance destination = {destination} origin = {origin} settravelTD = {(time, distance)=> {
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
