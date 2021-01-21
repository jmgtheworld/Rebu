import React, { useEffect, useState } from "react";

import Home from "./Home";
import HomeDriver from "./HomeDriver";
import HomeDriverwithMap from './HomeDriverwithMap';

import Axios from "axios";

const Homee = (props) => {
  const [ user, setUser ] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get("http://localhost:3001/users/data", { headers: { "x-access-token": token} })
      .then((res) => {
        console.log("USERINFO: ", res.data);
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* <h1>Logged In: {props.loggedIn}</h1> */}
      {!user.driver && <Home user={user} />}
      {user.driver && <HomeDriver user={user} />}
    </div>
  )
};

export default Homee;