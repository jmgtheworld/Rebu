import axios from 'axios';
import React, { useState } from 'react';
import Axios from "axios";

import { Card, Col, Row, Button, Badge } from 'react-bootstrap';

import ConfirmModal from "./ConfirmModal";

export default function RequestCard (props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const tripId = props.id;
  

  function confirm (tripId) {
    setIsConfirmed(true);
    console.log("Trip Id: ",tripId)
    return Axios.put(`http://localhost:3001/trips/${tripId}/accept`)
      .then(()=> console.log("trip is now accepted!"))
      .catch(err => console.log("Error from put request: ", err))
  }

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
              <Button variant="primary" onClick={() => setModalShow(true)}>
              Accept
              </Button>
              <ConfirmModal
                show={modalShow}
                tripId={tripId}
                onHide={() => setModalShow(false)}
                start_address={props.start_address}
                end_address={props.end_address}
                price={props.price}
                confirm={confirm}
              />
            </Col>
            }
            {isConfirmed &&
              <div>
                <Badge pill variant="success">Accepted</Badge>
              </div>
            }
          </Row>
        </Card.Body>
      </Card>
    </Card.Body>
  )
}