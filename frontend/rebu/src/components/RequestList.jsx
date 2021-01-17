import { Card, Col, Row, Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';

import RequestCard from "./RequestCard";

export default function RequestList (props) {
  const requests = props.requests.map(request => {
    return (
      <RequestCard 
        key={request.id}
        id={request.id}
        price={request.payment_amount}
        accepted={request.accepted}
        status={request.accepted}
        start_address={request.start_address}
        end_address={request.end_address}
        created_at={request.created_at}
      />
    )
  })

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col column sm={3}>From</Col>
          <Col column sm={3}>To</Col>
          <Col column sm={2}>Price</Col>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              menuAlign="right"
              key="Secondary"
              id="dropdown-variants-Secondary"
              title="Settings"
              variant="secondary"
            >
              Distance
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