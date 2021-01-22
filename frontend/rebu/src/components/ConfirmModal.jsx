import {useState, useEffect, useCallback} from 'react';
import Axios from 'axios';
import {Modal, Button} from 'react-bootstrap';

export default function ConfirmModal (props) {

  const {confirm, driverlocation, origin, setOrigin, destination, 
    start_address, end_address, price,
    setDestination, pickup, setPickup, setPrice, start_location_lat, start_location_lon,
    end_location_lat, end_location_lon
  } = props;
  
  const [loaded, setloaded] = useState(false);
  console.log('driverlocation' , driverlocation)
  console.log('start location lat' , start_location_lat)
  console.log('start location lon' , start_location_lon)

  const controlDestinationLat = () => {
    if ( end_location_lat){
      return  end_location_lat
    }
    return null
  }

  const controlDestinationLng = () => {
    if (end_location_lon){
      return end_location_lon
    }
    return null
  }

  const [ trip, setTrip ] = useState({
    customer_id: 1,
    driver_id: null,
    start_address: end_address,
    end_address: start_address,
    start_location_lat: controlDestinationLat(),
    start_location_lon: controlDestinationLng(),
    end_location_lat: start_location_lat,
    end_location_lon: start_location_lon,
    accepted: true,
    payment_amount: price,
    payment_status: false,
    created_at: Date.now(),
    ended_at: null
  })

  useEffect(() => {
    if (loaded) {
      console.log('newtrip', trip)
      return Axios.put("http://localhost:3001/trips/1/accept", trip)
        .then(() => console.log("new trip request created"))
        .catch(err => console.log(err));
    }
  }, [loaded])


  const confirmTrip = () => {
    setloaded(true)
    setTrip({
      customer_id: 1,
      driver_id: null,
      start_address: start_address,
      end_address: end_address,
      start_location_lat: origin.lat,
      start_location_lon: origin.lng,
      end_location_lat: controlDestinationLat(),
      end_location_lon: controlDestinationLng(),
      accepted: true,
      payment_amount: price,
      payment_status: false,
      created_at: Date.now(),
      ended_at: null
    })
    console.log('trip confirmed', trip)
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
          setPrice(props.price)
        }}>
          Yes
        </Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>

  )
}