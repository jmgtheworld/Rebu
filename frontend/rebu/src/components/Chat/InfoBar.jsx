import { FiMessageCircle } from 'react-icons/fi'
import './InfoBar.css';

export default function InfoBar (props) {
  return (
    <div className="infoBar"> 
      <div className="leftInnerContainer">
        <FiMessageCircle />
        <p>Talking to: {props.otherUserName}</p>
      </div>
      <div className="rightInnerContainer">
        
      </div>
    </div>
  )
}