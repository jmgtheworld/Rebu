
import { React, useState, useEffect } from "react";
import Axios from 'axios';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Form, Col } from 'react-bootstrap';
import RiderRegisterForm from "./Register/RiderRegisterForm";
import DriverRegisterForm from './Register/DriverRegisterForm';

import './Register/Register.scss';

export default function Settings(props) {
  const token = localStorage.getItem("token");
  // console.log("settings", token);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const requestsAPI = "http://localhost:3001/users/data"
    Axios.get(requestsAPI, { headers: { "x-access-token": token} }) //would be /api/trips/requested to get trips that have the accepted===false
      .then(res => setCurrentUser(res.data));
  }, {});

  const updateUser = (e) => {
    e.preventDefault();

    // axios here

  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCurrentUser({ ...currentUser, [name]: value});
  };

  const userCheck = (e) => {
    setCurrentUser({...currentUser, driver: e.target.value});

    if (currentUser.driver === true) {
      setCurrentUser({...currentUser, driver: true });
    }
  }

  console.log(currentUser);

  return (
    <div>
      {!token && <Redirect to="/login" />}
      <h1>Settings</h1>
      <Form.Row>
        <Form.Label as="legend" column sm={2}>
          User Type
        </Form.Label>
        <Form.Row as={Col}>
          <Form.Check
            type="radio"
            label="Rider"
            name="formHorizontalRadios"
            value="rider"
            id="formHorizontalRadios1"
            defaultChecked
            onClick={userCheck}
          />
          <Form.Check
            type="radio"
            label="Driver"
            name="formHorizontalRadios"
            value="driver"
            id="formHorizontalRadios2"
            onClick={userCheck}
          />
        </Form.Row>
      </Form.Row>
      {currentUser.driver === false && 
        <RiderRegisterForm 
          // register={register}
          change={handleChange}
          userInfo={currentUser}
        />
      }
      {currentUser.driver === true && 
        <DriverRegisterForm 
        change={handleChange}
        // register={register}
        userInfo={currentUser}
        />
      }
    </div>
  )
}