import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Spinner, Button, ButtonGroup} from 'react-bootstrap';
import { Redirect } from 'react-router';
// import { render } from 'react-dom'

import Trail from './Animations/Trail';
import './HomeNotLoggedIn.scss';

const HomeNotLoggedIn = () => {
  const [open, set] = useState(true);

  function login () {
    return (
      <Redirect to="/login"/>
    )
  };

  const register = () => {
    return (
      <Redirect to="/register"/>
    )
  };

  return (
    <div id="body">
      {/* <h1>Not logged in (adding stuff to this rn)</h1> */}
      <Trail open={open} onClick={() => set((state) => !state)}>
        <span id="app-name">Rebu</span>
        <span className="slogan">designated</span>
        <span className="slogan">driving</span>
        <span className="slogan">service</span>
      </Trail>
      {/* <h2>test</h2> */}
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

// render(<HomeNotLoggenIn />, document.getElementById('root'))

export default HomeNotLoggedIn;