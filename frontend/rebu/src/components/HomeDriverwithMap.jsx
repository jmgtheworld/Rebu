import React, { useState, useEffect } from 'react';
import Axios from 'axios';


import RequestList from "./RequestList";
import MapDriver from './Map_Driver';
import DriverSummary from './DriverSummary';


export default function HomeDriverwithMap () {
  const [requests, setRequests] = useState([]); 
  const [driverlocation, setDriverlocation] = useState([]); 

  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  })

  const [startAddress, setstartAddress] = useState("");
  const [finishAddress, setfinishAddress] = useState("");
  
  // Coords
  const[origin, setOrigin] = useState(
    {
      lat: null, 
      lng: null 
    }
  );
  
  const[destination, setDestination] = useState(
    {
      lat:null, 
      lng:null
    }
  );

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/trips"
    Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setRequests(res.data));
  },[])

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users"
    Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setDriverlocation(res.data));
  },[])

  //function to filter requests by distances
  //function when the request is accepted
    //post requests to api/trips/:id and changes accepted column to 'true'
    //and directs the user to the /trip view route where the navigation starts
  console.log(driverlocation[1])
  return (
    <div>
      <div>Map to show other drivers</div>
      <div>
        <h2>Requests</h2>
        <div className = "map">
          <MapDriver 
            driverlocation = {driverlocation[1]}
            travelTD = {travelTD} settravelTD = {settravelTD}
            origin = {origin} setOrigin = {setOrigin} 
            destination = {destination} setDestination = {setDestination}
            startAddress = {startAddress} setstartAddress = {setstartAddress}
            finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
          />
        </div>
        <DriverSummary travelTD = {travelTD} settravelTD = {settravelTD}/>
        <RequestList 
          driverlocation = {driverlocation[1]}
          requests = {requests} 
          origin = {origin}
          destination = {destination}
          setOrigin = {setOrigin} 
          setDestination = {setDestination}
        />
      </div>
    </div>
  )
}