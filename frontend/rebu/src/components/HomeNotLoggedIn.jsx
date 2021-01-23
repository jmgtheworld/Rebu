import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router';
// import { render } from 'react-dom'

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';
import Login from './Login'

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  const login = () => {
    // console.log('login');
    // <Redirect to= "/login" />
    // return (
    //   // <Link to="/login"/>
    //   <Redirect to= "/login" />
    // )
    return <Redirect to="/login"/>
  };

  const register = () => {
    return (
      <Redirect to= "/register" />
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
        <Button variant="success" size="lg" onClick={login}>
            Login
        </Button>
        <Button variant="info" size="lg" onClick={register}>
            Register
        </Button>
      </div>
      
    </div>
  )
}

export default HomeNotLoggedIn;