import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import Homee from './Homee';
// import { locals } from '../../../../backend/backend-express/app';

export default function Login(props) {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  //login page
  // get request to  /users/login
    //which has a query that can find a user exists with the same email AND same password(unhashed)
    //if undefined, error message tells the user to register
    //if password is wrong, error messsage tells the user the password is wrong

  function login (e) {
    e.preventDefault();
    const user = { email, password }

    // Axios.post("http://localhost:3001/users/login", user, {headers: { "x-access-token": "asdf"}})

    return Axios.post("http://localhost:3001/users/login", user)
      // .then(res => {
      //   console.log(res.data)
      //   // res.data.user_id ? <Homee user_id={res.data.user_id} /> : <Login />
      //   if (res.data.user_id) {

      //   }
      // })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        // console.log("logged in, user id:", res.data);
      })
      .catch(err => console.log(err));
  };

  function handleEmailChange (e) {
    setEmail(e.target.value);
  };

  function handlePwChange (e) {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h1> Login Page </h1>
      {/* <h1>Status: {props.loggedIn}</h1> */}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={handleEmailChange} value={email} placeholder="Enter email"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handlePwChange} value={password} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  )
}