import React from 'react';

import TripCard from "./TripCard";

export default function TripList (props) {
  const trips = props.trips.map(trip => {
    return (
      <TripCard 
        key={trip.id}
        created_at={trip.created_at}
        start_address={trip.start_address}
        end_address={trip.end_address}
        payment_amount={trip.payment_amount}
        payment_status={trip.payment_amount}
      />
    )
  })

  return (
    <div>
      {trips}
    </div>
  )
}