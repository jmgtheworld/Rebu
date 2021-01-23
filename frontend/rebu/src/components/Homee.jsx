import React, { useEffect, useState } from "react";

import Home from "./Home";
import HomeDriver from "./HomeDriver";
import HomeDriverwithMap from './HomeDriverwithMap';
import ChatModal from './ChatModal';

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

  const [ acceptedTrip, setAcceptedTrip ] = useState("")

  function getAcceptedTrip (tripId) {
    //stores the trip info with the driver id and customer id in the acceptedTrip state
    // gets triggered when the driver accepts the requset
    // 
    return Axios.get(`http://localhost:3001/trips/${tripId}`)
      .then((res) => {
        console.log("TRIP THAT WAS ACCEPTED: ", res.data)
        setAcceptedTrip(res.data);
      })
  }

  return (
    <div id="homepage">
      {/* <h1>Logged In: {props.loggedIn}</h1> */}
      {!user.driver && 
        <Home 
          user={user} 
          chatSelected={chatSelected}
          acceptedTrip={acceptedTrip}
        />
      }
      {user.driver && 
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