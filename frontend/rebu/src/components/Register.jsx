import React, { useState } from 'react';
import Axios from 'axios';

import { Form, Button, Col } from 'react-bootstrap';


export default function Register() {
  const [ newUser, setNewUser ] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    credit_card: "",
    expirty_date: "",
    cvc: "",
    driver: false,
    license: null
  })
  const [ full_name, setFullName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ phone_number, setPhoneNumber ] = useState("");
  const [ credit_card, setCreditCard ] = useState("");
  const [ expiry_date, setExpiryDate ] = useState("");
  const [ cvc, setCvc ] = useState("");
  const [ driver, setDriver ] = useState(false);
  const [ license, setLicense ] = useState(null);
  const [ errors, setErrors ] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    credit_card: "",
    expirty_date: "",
    cvc: "",
    license: ""
  })

  function register (e) {
    e.preventDefault();

    if (formValid(errors)) {
      const newUser = {
        full_name, email, password, phone_number, credit_card, expiry_date, cvc, driver, license
      }
      console.log("New User: ",newUser);
  
      Axios.post("/api/users", newUser)
      .then(() => console.log("new user added!"));
    } else {
      console.error("FORM INVALID");
    }
  }

  function formValid (formErrors) {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  }

  // function handleChange (e) {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = errors;

  //   switch(name) {
  //     case 'full_name':
  //       formErrors.full_name = value.length > 0 ? 'Please enter name' : '';
  //       break;
  //     case 'email':
  //       formErrors.email = value.length > 0 ? 'Please enter email' : '';
  //       break;
  //     case 'password':
  //       formErrors.password = value.length > 0 ? 'Please enter password' : '';
  //       break;
  //     case 'phone_number':
  //       formErrors.phone_number = value.length > 0 ? 'Please enter phone number' : '';
  //       break;
  //     case 'credit_card':
  //       formErrors.credit_card = value.length > 0 ? 'Please enter credit card number' : '';
  //       break;
  //     case 'expiry_date':
  //       formErrors.expiry_date = value.length > 0 ? 'Expiry date missing' : '';
  //       break;
  //     case 'cvc':
  //       formErrors.cvc = value.length > 0 ? 'cvc code not valid' : '';
  //       break;
  //     case 'license':
  //       formErrors.license = value.length > 0 ? 'Please enter your license number' : '';
  //       break;
  //     default;
  //       break;
  //   }

  //   this.setErrors({ })
  // };

  function userCheck () {
    console.log("check!")
  }


  return (
    <div>
      <h1> Register</h1>
      <Form>
        <Form.Row>
          <Form.Label as="legend" column sm={2}>
            User Type
          </Form.Label>
          <Form.Row as={Col}>
            <Form.Check
              type="radio"
              label="Rider"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
              onClick={userCheck}
            />
            <Form.Check
              type="radio"
              label="Driver"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              onClick={userCheck}
            />
          </Form.Row>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Full Name</Form.Label>
            <Form.Control placeholder="John Doe" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
        <Form.Group as={Col} controlId="formGridAddress2">
          <Form.Label>Credit Card Information</Form.Label>
          <Form.Control placeholder="1111 1111 1111 1111" />
          <Form.Row>
            <Form.Label as="legend" column sm={2}>
              Credit Card Type
            </Form.Label>
            <Form.Check
              type="radio"
              label="VISA"
              name="formHorizontalRadios"
              id="formHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="MasterCard"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="AMEX"
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
            />
          </Form.Row>

        </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control type="text" placeholder="ex. 11/20" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>CVC</Form.Label>
            <Form.Control type="text" placeholder="CVC" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" onSubmit={register}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
