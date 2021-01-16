import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Settings from "./components/Settings"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router >
      <div className = "App">
        <Navbar />
        <Switch>
          <Route path = "/settings">
            <Settings />
          </Route>
          <Route path = "/login">
            <Login />
          </Route>
          <Route path = "/register">
            <Register />
          </Route>
          <Route path = "/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
