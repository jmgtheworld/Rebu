import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import RequestList from "./RequestList";


export default function HomeDriver () {
  const [requests, setRequests] = useState([]); 

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/trips"
    Axios.get(requestsAPI) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setRequests(res.data));
  },[])


  return (
    <div>
      <div>Map to show other drivers</div>
      <div>
        <h2>Requests</h2>
        <RequestList requests={requests} />
      </div>
    </div>
  )
}