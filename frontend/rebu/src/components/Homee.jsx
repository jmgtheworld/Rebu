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
  const [ isTripAccepted, setIsTripAccepted ] = useState(false)

  useEffect(() => {
    Axios.get("http://localhost:3001/users/data", { headers: { "x-access-token": token} })
      .then((res) => {
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, []);



  function clickHandler (e) {
    if (isTripAccepted) {
      setChatSelected(!chatSelected);
    }
  };

  return (
    <div id="homepage">
      {!token && <HomeNotLoggedIn />}
      {!user.driver && token &&
        <Home 
          user={user} 
          chatSelected={chatSelected}
          setIsTripAccepted={setIsTripAccepted}
        />
      }
      {user.driver && token &&
        <HomeDriver 
          user={user} 
          setIsTripAccepted={setIsTripAccepted}
          chatSelected={chatSelected} 
        />
      }
      <ChatModal onClick={clickHandler} setChatSelected={setChatSelected} chatSelected={chatSelected} />
    </div>
  )
};

export default Homee;