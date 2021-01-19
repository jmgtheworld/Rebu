import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RequestList from "./RequestList";
import Chat from "./Chat";


export default function HomeDriver () {
  const [requests, setRequests] = useState([]); 

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
      <h1>Map to show other drivers</h1>
      <div>
        <h2>Chat Feature</h2>
        <Chat />
      </div>
      <div>
        <h2>Requests</h2>
        <RequestList requests={requests} />
      </div>
    </div>
  )
}