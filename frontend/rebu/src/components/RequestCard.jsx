import React, {useState} from 'react';

import { Card, Col, Row, Button, Badge } from 'react-bootstrap';

import ConfirmModal from "./ConfirmModal";

export default function RequestCard (props) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false);


  return (
    <Card.Body>
      <Card>
        <Card.Body>
          <Row>
            <Col column sm={3}>{props.start_address}, Distance to the customer</Col>
            <Col column sm={3}>{props.end_address}, duration of the drive</Col>
            <Col column sm={2}>{props.price}</Col>
            {!isConfirmed && 
              <Col>
                <Button onClick={() => setIsOpen(true)} variant="outline-primary">Accept</Button>
                <ConfirmModal 
                  open={isOpen} 
                  cancel={()=> setIsOpen(false)}
                  confirm={() => setIsConfirmed(true)}
                />
              </Col>
            }
            {isConfirmed &&
              <Badge pill variant="success">Accepted</Badge>
            }
          </Row>
        </Card.Body>
      </Card>
    </Card.Body>
  )
}