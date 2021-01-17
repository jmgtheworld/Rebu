import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import TripList from "./TripList"

export default function History () {
  const [ trips, setTrips ] = useState([])

  useEffect(() => {
    Axios.get("api/users/:id/trips")
      .then((res) => {
        console.log(res.data);
        setTrips(res.data);
      })
      .catch(err => console.log(err))
  },[]);

  return (
    <div>
      <h1>Trips</h1>
      <div>
        <TripList trips={trips}/>
      </div>
    </div>
  )
}