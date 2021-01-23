import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RequestList from "./RequestList";
import MapDriver from './Map_Driver';
import DriverSummary from './DriverSummary';
import Chat from "./Chat/Chat";

import './Chat/Chat.css'

export default function HomeDriver (props) {
  const [requests, setRequests] = useState([]); 

  const[travelMode, setTravelMode] = React.useState("WALKING");

  const [driverlocation, setDriverlocation] = useState([]); 

  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  })

  const [price, setPrice] = useState("");

  const [startAddress, setstartAddress] = useState("");
  const [finishAddress, setfinishAddress] = useState("");
  
  // Coords
  const[origin, setOrigin] = useState({
    lat: null, 
    lng: null 
  });

  const [pickup, setPickup] = useState({
    lat: null, 
    lng: null
  });
  
  const[destination, setDestination] = useState({
    lat: null, 
    lng: null
  }); 
  
  const requestsAPI = "http://localhost:3001/trips/not-accepted";

  useEffect(() => {
    Axios.get(requestsAPI) 
      .then(res => setRequests(res.data));
  },[requestsAPI])

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users"
    Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setDriverlocation(res.data));
  },[])

  

    
  return (
    <div>
      <div>Map to show other drivers</div>
      <div>
        <h2>Requests</h2>
        <div className = "map">
          <MapDriver 
            driverlocation = {driverlocation[1]}
            travelMode = {travelMode}
            setTravelMode = {setTravelMode}
            travelTD = {travelTD} settravelTD = {settravelTD}
            origin = {origin} setOrigin = {setOrigin} 
            pickup = {pickup}
            destination = {destination} setDestination = {setDestination}
            startAddress = {startAddress} setstartAddress = {setstartAddress}
            finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
          />
        </div>
        <DriverSummary price = {price} travelMode = {travelMode} travelTD = {travelTD} settravelTD = {settravelTD}/>
        <div id="chat">
          <h2>Chat</h2>
          { props.chatSelected && 
            <Chat
              name={props.user.full_name}
              driver={props.user.driver}
              acceptedTrip={props.acceptedTrip}
            />
          }
      </div>
        <RequestList 
          driverlocation = {driverlocation[1]}
          requests = {requests} 
          origin = {origin}
          pickup = {pickup}
          destination = {destination}
          setOrigin = {setOrigin} 
          setPickup = {setPickup}
          setDestination = {setDestination}
          setPrice = {setPrice}
          setChatSelected={props.setChatSelected}
          getAcceptedTrip={props.getAcceptedTrip}
        />
      </div>
    </div>
  )
}