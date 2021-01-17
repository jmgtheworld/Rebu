import React, { useState } from 'react';

export default function History () {
  const [ trips, setTrips ] = useState([])

  useEffect(() => {

  })

  return (
    <div>
      <h1>Trips</h1>
      <div>
        <TripList />
      </div>
    </div>
  )
}