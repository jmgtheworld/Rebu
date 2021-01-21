import React, {Fragment} from "react";
import Geocode from "react-geocode";
import { Spinner, Button, ButtonGroup} from 'react-bootstrap';

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


Geocode.setApiKey("AIzaSyB8sDvFcA2Ig2Vx6DsFun56ZtWkk0VunN0");


export default function MapDriver(props) {

  const {travelTD, settravelTD, startAddress, setstartAddress, setfinishAddress, origin, destination}  = props;
  const [markers, setMarkers] = React.useState([]);

  const [loadedOnce, setloadedOnce] = React.useState(false)

  // Directions State
  const[response, setResponse] = React.useState(null);
  const[travelMode, setTravelMode] = React.useState("WALKING");

  console.log('origin from map_driver', origin)
  const places = [
    {latitude: origin.lat, longitude: origin.lng},
    {latitude: destination.lat, longitude: destination.lng},
  ]
  
  console.log('places', places)
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB8sDvFcA2Ig2Vx6DsFun56ZtWkk0VunN0",
    libraries,
  });

  // const onMapClick = React.useCallback((e) => {
  //   setMarkers(() => [
  //     {
  //       lat: e.latLng.lat(),
  //       lng: e.latLng.lng(),
  //       time: new Date(),
  //     },
  //   ]);
  // }, []);

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

  console.log("tranist mode", travelMode)

  if (!isLoaded) return <Spinner animation="border" variant="secondary" />;

  return (
    <div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
        <MapDirectionsRenderer places = {places} travelMode = {travelMode} loadedOnce = {loadedOnce} setloadedOnce = {setloadedOnce}/>
        {destination && origin && <Distance 
          travelMode = {travelMode} 
          setstartAddress = {setstartAddress} 
          loadedOnce = {loadedOnce} 
          setloadedOnce = {setloadedOnce} 
          destination = {destination} 
          setstartAddress = {setstartAddress}
          setfinishAddress = {setfinishAddress}
          origin = {origin} 
          settravelTD = {(time, distance)=> {
            settravelTD({
              ...travelTD,
              time,
              distance
            })
        }}/> }
      </GoogleMap>
      
      <div className = "driverInfo">
        <> 
          <span className = "driverSpan"> How will you get to the user? </span>
          <ButtonGroup size="lg" className="mb-2 transitOptions">
            <Button key = "WALKING" variant = "secondary" onClick = {() => { setTravelMode("WALKING")} }> Walk </Button>
            <Button key = "TRANSIT" variant= "secondary" onClick = {() => { setTravelMode("TRANSIT")} }> Transit </Button>
            <Button key = "BICYCLING" variant= "secondary"  onClick = {() => { setTravelMode("BICYCLING")} }> Bike </Button>
          </ButtonGroup>
        </>
      </div>
    </div>
  );
}
