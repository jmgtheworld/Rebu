import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function Login() {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  //login page
  // get request to  /api/users/login
    //which has a query that can find a user exists with the same email AND same password(unhashed)
    //if undefined, error message tells the user to register
    //if password is wrong, error messsage tells the user the password is wrong

  function login () {
    const user = { email, password }
    
    return Axios.get("/api/users/login", user)
     .then(() => console.log("logged in!"));
     
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
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" onChange={handleEmailChange} value={email}placeholder="Enter email"/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handlePwChange} value={password} type="password" placeholder="Password" />
        </Form.Group>
        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" onSubmit={login}>
          Submit
        </Button>
      </Form>
    </div>
  )
}