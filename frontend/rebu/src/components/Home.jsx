import {useState, Fragment} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';

export default function Home(props) {

  const [travelTD, settravelTD] = useState({
    time: "0",
    distance: "0",
  })
  // Coords
  const[origin, setOrigin] = useState({lat:43.6453, lng:-79.3806});
  const[destination, setDestination] = useState({lat:43.6706, lng:-79.3865});

  // Formated Addresses
  const [startAddress, setstartAddress] = useState("");
  const [finishAddress, setfinishAddress] = useState("");

  return (
    <Fragment>
      <div className = "map">
        <Map 
          travelTD = {travelTD} settravelTD = {settravelTD} 
          origin = {origin} setOrigin = {setOrigin} 
          destination = {destination} setDestination = {setDestination}
          startAddress = {startAddress} setstartAddress = {setstartAddress}
          finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
        />
      </div>
        <UserSummary 
          travelTD = {travelTD} settravelTD = {settravelTD}
          origin = {origin} setOrigin = {setOrigin} 
          destination = {destination} setDestination = {setDestination}
          startAddress = {startAddress} 
          finishAddress = {finishAddress} setfinishAddress = {setfinishAddress}
        />
    </Fragment>

  )
}