
import {useEffect, useState} from 'react';
import {
  DirectionsRenderer,
} from "@react-google-maps/api";

export default function MapDirectionsRenderer(props) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const { places, travelMode, setloadedOnce } = props;
    console.log(places, travelMode)

    const waypoints = places.map(p => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        waypoints: waypoints
      },
      (result, status) => {
        console.log('result from directions service', result)
        if (status === window.google.maps.DirectionsStatus.OK) {
          setloadedOnce(false);
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );   
  })
  
  if (error) {
    console.log({error})
  }
  console.log('directions within direction rednerer', directions)
  return (
    directions && (
      <DirectionsRenderer directions={directions} />
    )
  );
}