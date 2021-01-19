import React, { useEffect, useState } from "react";

import Home from "./Home";
import HomeDriver from "./HomeDriver";

import Axios from "axios";

const Homee = (props) => {
  const [ userType, setUserType ] = useState("");
  // const user_id = props.user_id;

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/2`)//would be /api/users/:id instead
      .then((res) => {
        console.log(res.data.driver);
        res.data.driver ? setUserType("driver") : setUserType("rider");
      }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Logged In: {props.loggedIn}</h1>
      {userType === "rider" && <Home />}
      {userType === "driver" && <HomeDriver />}
    </div>
  )
};

export default Homee;