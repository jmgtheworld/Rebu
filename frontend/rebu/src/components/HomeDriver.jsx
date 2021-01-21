import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RequestList from "./RequestList";
import MapDriver from './Map_Driver';
import DriverSummary from './DriverSummary';
import Chat from "./Chat/Chat";

import './Chat/Chat.css'

export default function HomeDriver (props) {
  const [requests, setRequests] = useState([]); 

  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  }) 
  
  const requestsAPI = "http://localhost:3001/trips/not-accepted";

  useEffect(() => {
    Axios.get(requestsAPI) 
      .then(res => setRequests(res.data));
  },[requestsAPI])


  //function to filter requests by distances
  //function when the request is accepted
    //put requests to api/trips/:id and changes accepted column to 'true' and input the user's id into the driver_id column
    //and directs the user to the /trip view route where the navigation starts

    
  return (
    <div>
      <div>Map to show other drivers</div>
      <div className = "map">
        <MapDriver travelTD = {travelTD} settravelTD = {settravelTD}/>
      </div>
      <DriverSummary travelTD = {travelTD} settravelTD = {settravelTD}/>
      <div id="chat">
        <h2>Chat</h2>
        <Chat
          name={props.user.full_name}
          driver={props.user.driver}
        />
      </div>
      <div>
        <h2>Requests</h2>
        <RequestList 
          requests={requests} 
        />
      </div>
    </div>
  )
}