import React, { useEffect, useState } from "react";

import Home from "./Home";
import HomeDriver from "./HomeDriver";

import Axios from "axios";

const Homee =  () => {
  const [ driver, setDriver ] = useState(false);


  useEffect(() => {
    Axios.get("http://localhost:3001/users/2")//would be /api/users/:id instead
      .then((res) => {
        console.log(res.data.driver);
        res.data.driver ? setDriver("true") : setDriver(false);
      }).catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div>
      {!driver && <Home />}
      {driver && <HomeDriver />}
      </div>
    </div>
  )
};

export default Homee;