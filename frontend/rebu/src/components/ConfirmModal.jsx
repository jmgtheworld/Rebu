import {Modal, Button} from 'react-bootstrap';

export default function ConfirmModal (props) {
  // if (!props.open) return null

  return (
    // <div style={OVERLAY_STYLES}>
    //   <button style={POPUP_STYLES} onClick={props.onClose}>
    //     Would you like to accept?
    //     <button onClick={props.confirm}>Yes</button>
    //     <button onClick={props.cancel}>No</button>
    //   </button>
    // </div>
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
        <p>Price: {props.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.confirm}>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
      </Modal.Footer>
    </Modal>

  )
}