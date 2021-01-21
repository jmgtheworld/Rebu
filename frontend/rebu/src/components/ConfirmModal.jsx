import {useState, useEffect, useCallback} from 'react';
import Axios from 'axios';
import {Modal, Button} from 'react-bootstrap';

export default function ConfirmModal (props) {

  const {confirm, driverlocation, origin, setOrigin, destination, setDestination, start_location_lat, start_location_lon} = props;
  
  const [loaded, setloaded] = useState(false);
  console.log('driverlocation' , driverlocation)
  console.log('start location lat' , start_location_lat)
  console.log('start location lon' , start_location_lon)

  useEffect(() => {
    if (loaded) {
      console.log('newtrip', )
      return Axios.put("http://localhost:3001/trips/1/accept", )
        .then(() => console.log("new trip request created"))
        .catch(err => console.log(err));
    }
  }, [loaded])


  const confirmTrip = () => {
    // setloaded(true)
      setDestination({
        lat: start_location_lat,
        lng: start_location_lon
      })
      setOrigin({
        lat: driverlocation.current_location_lat,
        lng: driverlocation.current_location_lon
      })
      console.log('origin after submit', origin)
      console.log('destination after submit', destination)
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Accept this request?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>From: {props.start_address}</p>
        <p>To: {props.end_address}</p>
        <p>Price: ${props.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          confirm()
          confirmTrip()
        }}>
          Yes
        </Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>

  )
}