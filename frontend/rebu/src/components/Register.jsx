import React, { useState } from 'react';
import Axios from 'axios';

import { Form, Col } from 'react-bootstrap';
import RiderRegisterForm from "./RiderRegisterForm"
import DriverRegisterForm from "./DriverRegisterForm"


export default function Register() {
  const [ newUser, setNewUser ] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    credit_card: "",
    month_year: "",
    cvc: "",
    street_address: "",
    apartment_number: null,
    city: "",
    postal_code: "",
    province: "",
    country: "",
    driver: false,
    license: null
  })
  const [ userType, setUserType ] = useState("rider");

  // const [ errors, setErrors ] = useState({
  //   full_name: "",
  //   email: "",
  //   password: "",
  //   phone_number: "",
  //   credit_card: "",
  //   expirty_date: "",
  //   cvc: "",
  //   street_address: "",
  //   appartment_number: null,
  //   city: "",
  //   postal_code: "",
  //   province: "",
  //   country: "",
  //   license: ""
  // })

  function register (e) {
    e.preventDefault();

    console.log("UserInfo: ", newUser);
    
    return Axios.post("http://localhost:3001/users", newUser)
    .then(() => console.log("New user added!"))
    .catch(err => console.log(err))
  }

  // function formValid (formErrors) {
  //   let valid = true;
  //   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  //   return valid;
  // }

  function handleChange (e) {
    e.preventDefault();
    const { name, value } = e.target;

    setNewUser({ ...newUser, [name]: value});
  };


  function userCheck (e) {
    setUserType(e.target.value);

    if (userType === "driver") {
      setNewUser({...newUser, driver: true });
    }
  }
  console.log(userType)

  return (
    <div>
      <h1> Register</h1>
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
      {userType === "rider" && 
        <RiderRegisterForm 
          register={register}
          change={handleChange}
          userInfo={newUser}
        />
      }
      {userType === "driver" && 
        <DriverRegisterForm 
        change={handleChange}
        register={register}
        userInfo={newUser}
        />
      }
    </div>
  )
}

// switch(name) {
    //   case 'full_name':
    //     formErrors.full_name = value.length > 0 ? 'Please enter name' : '';
    //     break;
    //   case 'email':
    //     formErrors.email = value.length > 0 ? 'Please enter email' : '';
    //     break;
    //   case 'password':
    //     formErrors.password = value.length > 0 ? 'Please enter password' : '';
    //     break;
    //   case 'phone_number':
    //     formErrors.phone_number = value.length > 0 ? 'Please enter phone number' : '';
    //     break;
    //   case 'credit_card':
    //     formErrors.credit_card = value.length > 0 ? 'Please enter credit card number' : '';
    //     break;
    //   case 'expiry_date':
    //     formErrors.expiry_date = value.length > 0 ? 'Expiry date missing' : '';
    //     break;
    //   case 'cvc':
    //     formErrors.cvc = value.length > 0 ? 'cvc code not valid' : '';
    //     break;
    //   case 'license':
    //     formErrors.license = value.length > 0 ? 'Please enter your license number' : '';
    //     break;
    //   default;
    //     break;
    // }
