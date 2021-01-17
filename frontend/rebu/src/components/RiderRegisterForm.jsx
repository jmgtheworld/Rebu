import { Form, Button, Col } from 'react-bootstrap';

export default function RiderRegisterForm (props) {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} column sm={3}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="full_name" type="text" onChange={props.change} placeholder="John Doe" />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" type="email" onChange={props.change} placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} column sm={3}>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" onChange={props.change} type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Label as ="legend">
          Credit Card Information
        </Form.Label>
        <Form.Group as={Col}>
          <Form.Label>Credit Card Number</Form.Label>
          <Form.Control name="credit_card" type="number" onChange={props.change} placeholder="1111111111111111" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control name="month_year" onChange={props.change} type="text" placeholder="ex. 11/20" />
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>CVC</Form.Label>
          <Form.Control name="cvc" onChange={props.change} type="text" placeholder="CVC" />
        </Form.Group>
      </Form.Row>

      {/* <Form.Row>
        <Form.Label>
          Credit Card Type
        </Form.Label>
        <Form.Check
          type="radio"
          label="VISA"
          name="formHorizontalRadios"
        />
        <Form.Check
          type="radio"
          label="MasterCard"
          name="formHorizontalRadios"
        />
        <Form.Check
          type="radio"
          label="AMEX"
          name="formHorizontalRadios"
        />
      </Form.Row> */}

      <Form.Row>
        <Form.Label as="legend">
          Billing Address
        </Form.Label>
        <Form.Group as={Col} >
          <Form.Label>Street Address</Form.Label>
          <Form.Control name="street_address" onChange={props.change} type="text" placeholder="Street Address" />
        </Form.Group>
        <Form.Group as={Col} column sm={2} >
          <Form.Label>Apt. number(optional)</Form.Label>
          <Form.Control name="apartment_number" onChange={props.change} type="text" placeholder="Apt. number" />
        </Form.Group>         
        <Form.Group as={Col} column sm={2}>
          <Form.Label>City</Form.Label>
          <Form.Control name="city" onChange={props.change} type="text" placeholder="City" />
        </Form.Group>
        <Form.Group as={Col} column sm={2}>
          <Form.Label>Province</Form.Label>
          <Form.Control name="province" onChange={props.change} type="text" placeholder="Province" />
        </Form.Group>
        <Form.Group as={Col} column sm={2}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control name="postal_code" onChange={props.change} type="text" placeholder="A1B 2L5" />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit" onSubmit={props.register}>
        Submit
      </Button>
    </Form>
  )
  
}