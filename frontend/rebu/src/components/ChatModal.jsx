import { RiChat1Fill } from 'react-icons/ri';

export default function ChatModal ({ setChatSelected, chatSelected }) {

  // function clickHandler (e) {

  //   setChatSelected(!chatSelected);
  // };

  return (
    <div className="modal-container">
      <RiChat1Fill color="white" className="modal-icon"/>
    </div>
  )
}