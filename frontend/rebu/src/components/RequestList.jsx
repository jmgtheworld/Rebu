import { Card, Col, Row, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';

import RequestCard from "./RequestCard";

export default function RequestList (props) {
  const {origin, setOrigin, destination, setDestination, pickup, setPickup, setPrice, driverlocation} = props;
  console.log('request list', driverlocation)
  const requests = props.requests.map(request => {
    return (
      <RequestCard 
        key={request.id}
        id={request.id}
        customer_id = {request.customer_id}
        price={request.payment_amount}
        accepted={request.accepted}
        status={request.accepted}
        start_address={request.start_address}
        end_address={request.end_address}
        created_at={request.created_at}
        driverlocation = {driverlocation}
        origin = {origin}
        pickup = {pickup}
        destination= {destination}
        setOrigin = {setOrigin}
        setPickup = {setPickup}
        setDestination = {setDestination}
        setPrice = {setPrice}
        start_location_lat = {request.start_location_lat}
        start_location_lon = {request.start_location_lon}
        end_location_lat = {request.end_location_lat}
        end_location_lon = {request.end_location_lon}
      />
    )
  })

  return (
    <Card>
      <Card.Header className = "cardHeader">
        <Row className = "cardRow">
          <Col column sm={3}>From</Col>
          <Col column sm={3}>To</Col>
          <Col column sm={2}>Price</Col>
          <Col column sm={3}>
            <DropdownButton
              as={ButtonGroup}
              menuAlign="right"
              key="Secondary"
              id="dropdown-variants-Secondary"
              title="Distance"
              variant="secondary"
              className = "distanceFilter"
            >
              Filter By Distance
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1">500m</Dropdown.Item>
              <Dropdown.Item eventKey="2">1km</Dropdown.Item>
              <Dropdown.Item eventKey="3">5km</Dropdown.Item>
              <Dropdown.Item eventKey="4">10km</Dropdown.Item>
              <Dropdown.Item eventKey="4">20km</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Card.Header>
      {requests}
    </Card>
  )
}