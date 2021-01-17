import { Card, Col, Row, Button } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';

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
          <Col></Col>
          <Button>
            <AiFillSetting />
          </Button>
        </Row>
      </Card.Header>
      {requests}
    </Card>
  )
}