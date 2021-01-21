import { FiMessageCircle } from 'react-icons/fi'
import './InfoBar.css';

export default function InfoBar ({ customer }) {
  return (
    <div className="infoBar"> 
      <div className="leftInnerContainer">
        <FiMessageCircle />
        <p>Customer name: {customer}</p>
      </div>
      <div className="rightInnerContainer">
        
      </div>
    </div>
  )
}