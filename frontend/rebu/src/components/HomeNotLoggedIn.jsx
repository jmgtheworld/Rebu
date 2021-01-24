import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  function login () {
    // <Redirect to="/login"/>
    return (
      // <Link to="/login"/>
      <Redirect to="/login"/>
    )
  };

  const register = () => {
    <Redirect to="/register"/>
    return (
      <Redirect to="/register"/>
    )
  };

  return (
    <div id="body">
      <Trail open={open} onClick={() => set((state) => !state)}>
        <span id="app-name">Rebu</span>
        <span className="slogan">designated</span>
        <span className="slogan">driving</span>
        <span className="slogan">service</span>
      </Trail>
      <div className="button-group">
        <Button variant="success" size="lg" onClick={login} className = "RLbutton">
          Login
        </Button>
        <Button variant="info" size="lg" onClick={register} className = "RLbutton">
          Register
        </Button>
      </div>
      
    </div>
  )
}

export default HomeNotLoggedIn;