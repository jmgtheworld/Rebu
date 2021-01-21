import {useState, Fragment, useEffect} from 'react';
import Map from './Map';
import UserSummary from './UserSummary';

import Chat from "./Chat/Chat";

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

  console.log("USER NAME:", props.user)
  console.log("USER NAME:", props.user.full_name)
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
      <div id="chat">
        <h1>Chat</h1>
        <Chat 
          name={props.user.full_name}
          driver={props.user.driver}
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