import React, { useEffect, useState } from "react";

import HomeRider from "./HomeRider";
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
        setUser(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div id="homepage">
      {!token && <HomeNotLoggedIn />}
      {!user.driver && token &&
        <HomeRider 
          user={user} 
          chatSelected={chatSelected}
        />
      }
      {user.driver && token &&
        <HomeDriver 
          user={user} 
          setChatSelected={setChatSelected} 
          chatSelected={chatSelected} 
        />
      }
      <ChatModal setChatSelected={setChatSelected} chatSelected={chatSelected} />
    </div>
  )
};

export default Homee;