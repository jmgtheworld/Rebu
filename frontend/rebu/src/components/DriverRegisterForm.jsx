import { Form, Button, Col } from 'react-bootstrap';

export default function DriverRegisterForm (props) {
  return (
    <Form onSubmit={props.register}>
      <Form.Row>
        <Form.Group as={Col} column sm={3}>
          <Form.Label>Full Name</Form.Label>
          <Form.Control name="full_name" value={props.userInfo.full_name} type="text" onChange={props.change} placeholder="John Doe" />
        </Form.Group>
        <Form.Group as={Col} column sm={3}>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control name="phone_number" value={props.userInfo.phone_number} type="number" onChange={props.change} placeholder="ex. 4161234567" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
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
        <Form.Group as={Col}>
          <Form.Label>Driver's License Number</Form.Label>
          <Form.Control name="license" onChange={props.change} placeholder="Driver's License number" />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Label as="legend">
          Home Address
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
          <Form.Label>Country</Form.Label>
          <Form.Control name="country" value={props.userInfo.country} onChange={props.change} type="text" placeholder="Country" />
        </Form.Group>
        <Form.Group as={Col} column sm={2}>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control name="postal_code" onChange={props.change} type="text" placeholder="A1B 2L5" />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
  
}