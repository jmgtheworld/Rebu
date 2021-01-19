import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Homee from "./components/Homee"
import Login from "./components/Login"
import Register from "./components/Register"
import Settings from "./components/Settings"
import Navbar from "./components/Navbar"
import History from "./components/History/History"

function App() {
  const [loggedIn, setLoggedIn] = useState("");
  const [user, setUser] = useState({});
  console.log("logged in:", loggedIn);
  console.log("user:", user);

  return (
    <Router >
      <div className = "App">
        <Navbar />
        <Switch>
          <Route path = "/settings">
            <Settings loggedIn={loggedIn} />
          </Route>
          <Route path = "/login">
            <Login loggedIn={loggedIn} />
          </Route>
          <Route path = "/register">
            <Register loggedIn={loggedIn} />
          </Route>
          <Route path = "/history">
            <History loggedIn={loggedIn} />
          </Route>
          <Route path = "/">
            <Homee loggedIn={loggedIn}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
