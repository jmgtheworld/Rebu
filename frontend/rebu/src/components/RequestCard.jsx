import { Card, Col, Row, Button } from 'react-bootstrap';

export default function RequestCard (props) {
  return (
    <Card.Body>
      <Card>
        <Card.Body>
          <Row>
            <Col column sm={3}>{props.start_address}, Distance to the customer</Col>
            <Col column sm={3}>{props.end_address}, duration of the drive</Col>
            <Col column sm={2}>{props.price}</Col>
            <Col>
              <Button variant="outline-primary">Accept</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Card.Body>
  )
}