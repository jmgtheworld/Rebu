import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';
// import logo from './Logo/Rebu-Logo.png';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  setInterval(() => set((state) => !state), 4000);

  return (
    <div id="body">
      <Trail open={open} >
        <span id="app-name">Rebu</span>
        {/* <span className="slogan">designated</span>
        <span className="slogan">driving</span>
        <span className="slogan">service</span> */}
      </Trail>
      <Trail open={!open} >
        <span className="slogan">Designated</span>
        <span className="slogan">Driving</span>
        <span className="slogan">Service</span>
      </Trail>

      {/* {!open &&
        <img id="logo" src={logo} />
      } */}
      <div className="button-group">
        <Link to="/login">
          <Button variant="success" size="lg" className = "RLbutton">
            Login
          </Button>
        </Link>
        <Link to ="/register">
          <Button variant="info" size="lg" className = "RLbutton">
            Register
          </Button>
        </Link>
      </div>
      
    </div>
  )
}

export default HomeNotLoggedIn;