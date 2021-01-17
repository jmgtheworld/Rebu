import {Modal, Button} from 'react-bootstrap';

export default function ConfirmModal (props) {

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
        <Button onClick={props.confirm}>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>

  )
}