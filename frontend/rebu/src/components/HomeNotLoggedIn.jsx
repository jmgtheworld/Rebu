import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  return (
    <div id="body">
      <Trail open={open} onClick={() => set((state) => !state)}>
        <span id="app-name">Rebu</span>
        <span className="slogan">designated</span>
        <span className="slogan">driving</span>
        <span className="slogan">service</span>
      </Trail>
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