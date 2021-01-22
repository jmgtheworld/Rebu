import axios from 'axios';
import React, { useState } from 'react';
import Axios from "axios";

import { Card, Col, Row, Button, Badge } from 'react-bootstrap';

import ConfirmModal from "./ConfirmModal";
import './RequestCard.scss'

export default function RequestCard (props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const {id, customer_id, start_address, end_address, driverlocation, origin, setOrigin, pickup, 
    setPickup, destination, setDestination, setPrice, start_location_lat, start_location_lon,
    end_location_lat, end_location_lon, created_at
  
  } = props;
  console.log('dirver location from request card', driverlocation)
  
  return (
    <Card.Body>
      <Card className = "tripCard">
        <Card.Body onClick = {() => {
          setOrigin({
            lat: driverlocation.current_location_lat,
            lng: driverlocation.current_location_lon
          })
          setPickup({
            lat: start_location_lat,
            lng: start_location_lon
          })
          setDestination({
            lat: end_location_lat, 
            lng: end_location_lon
          })
        }
        }>
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
                id = {id}
                customer_id = {customer_id}
                onHide={() => setModalShow(false)}
                price = {props.price}
                start_address={start_address}
                end_address={end_address}
                confirm={() => setIsConfirmed(true)}
                driverlocation = {driverlocation}
                origin = {origin}
                setOrigin = {setOrigin} 
                pickup = {pickup}
                setPickup = {setPickup}
                desination = {destination}
                setDestination = {setDestination}
                setPrice = {setPrice}
                start_location_lat = {start_location_lat}
                start_location_lon = {start_location_lon}
                end_location_lat = {end_location_lat}
                end_location_lon = {end_location_lon}
                created_at = {created_at}

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