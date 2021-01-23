import React, { useEffect, useState } from "react";

import Home from "./Home";
import HomeDriver from "./HomeDriver";
import ChatModal from './ChatModal';
import HomeNotLoggedIn from './HomeNotLoggedIn';

import Axios from "axios";

import './Home.scss';

const Homee = () => {
  const [ user, setUser ] = useState({});
  const token = localStorage.getItem("token");

  const [ chatSelected, setChatSelected ] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/users/data", { headers: { "x-access-token": token} })
      .then((res) => {
        console.log("USERINFO: ", res.data);
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const [ acceptedTrip, setAcceptedTrip ] = useState(
    {
      id: 2,
      customer_id: 1,
      driver_id: 2,
      start_address: "",
      end_address: "",
      start_location_lat: 43.6453,
      start_location_lon: -79.3806,
      end_location_lat: 43.6706,
      end_location_lon: -79.3865,
      accepted: true,
      payment_amount: 0,
      payment_status: false,
      created_at: "2021-01-18T05:17:29.998Z",
      ended_at: null,
      driver: true,
      full_name: "Jane Doe",
      email: "jdoe@mail.com",
      phone_number: "4162345678",
      credit_card: "411111111111",
      month_year: "02/24",
      cvc: "345",
      license: "S04206969696969",
      street_address: "598 Bay St",
      apartment_number: null,
      city: "Toronto",
      postal_code: "M5G 1M5",
      province: "ON",
      country: "Canada",
      current_location_lat: 43.6558,
      current_location_lon: -79.3841,
      password: "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.",
      customer_name: "test Customer",
      driver_name: "BOB"
      }
  )

  function getAcceptedTrip (tripId) {
    //stores the trip info with the driver id and customer id in the acceptedTrip state
    // gets triggered when the driver accepts the requset
    console.log("CALLING THE GET ACCEPTED TRIP FN")
    Axios.get(`http://localhost:3001/trips/${tripId}`)
      .then((res) => {
        console.log("TRIP THAT WAS ACCEPTED: ", res.data)
        setAcceptedTrip(res.data);
      })
  }

  return (
    <div id="homepage">
      {!token && <HomeNotLoggedIn />}
      {!user.driver && token &&
        <Home 
          user={user} 
          chatSelected={chatSelected}
          acceptedTrip={acceptedTrip}
        />
      }
      {user.driver && token &&
        <HomeDriver 
          user={user} 
          setChatSelected={setChatSelected} 
          chatSelected={chatSelected} 
          getAcceptedTrip={getAcceptedTrip}
          acceptedTrip={acceptedTrip}
        />
      }
      <ChatModal setChatSelected={setChatSelected} chatSelected={chatSelected} />
    </div>
  )
};

export default Homee;