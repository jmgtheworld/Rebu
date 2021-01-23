import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { io } from 'socket.io-client';

import InfoBar from "./InfoBar";
import Messages from './Messages';
import Input from './Input';

import "./Chat.css"

let socket;

export default function Chat (props) {
  const [ trip, setTrip ] = useState({});
  const [ otherUserName, setOtherUserName] = useState("");
  const [ room, setRoom ] = useState("")
  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState([]);

  

  const tripAPI = "http://localhost:3001/trips/1" //api endpoint to get the trip data that matches token === driver_id AND accepted === true AND ended_at === null (meaning the trip didn't end yet)

  const isUserDriver = props.driver;


  useEffect(()=> {
    // if (isUserDriver && props.acceptedTrip) {
    //   return Axios.get(tripAPI)
    //     .then((res) => {
    //       console.log(res.data);
    //       setTrip(res.data);
    //       setOtherUserName(res.data.customer_name);
    //       setRoom(res.data.id);
    //     })
    // } else {
    //   return Axios.get(tripAPI)
    //     .then((res) => {
    //       console.log("TRIPINFO: ", res.data);
    //       setTrip(res.data);
    //       setOtherUserName(res.data.driver_name);
    //       setRoom(res.data.id);
    //     })
    // }
    if (isUserDriver && props.acceptedTrip) {
      setOtherUserName(props.acceptedTrip.customer_name)
      setRoom(props.acceptedTrip.id)
    } else if (!isUserDriver && props.acceptedTrip) {
      setOtherUserName(props.acceptedTrip.driver_name)
      setRoom(props.acceptedTrip.id)
    }
  },[props.acceptedTrip]);

  useEffect(() => {
    if (props.name && room && props.acceptedTrip) {
      socket = io("http://localhost:3001", {
        transports: ["websocket", "polling"]
      });
      socket.emit("join", { name: props.name , room, isUserDriver })

      socket.on('message', (message) => {
        setMessages(messages => [...messages, message]);
        console.log("MESSAGE EMITTED: ", message)
      })

      return () => {
        socket.emit('disconnection');
        socket.off();
      }
    }
  }, [props.name, room, props.acceptedTrip])

  // useEffect(()=> {
    
  //   return socket && socket.on('notifyCustomer', ({ tripId }) => {
  //     console.log("REQUEST HAS BEEN ACCEPTED TRIGGERED")
  //     console.log(`CLIENT SIDE TRIPID: ${trip.id}, SERVER SIDE TRIPID: ${tripId}`)
      
  //     // if (trip.id === tripId) {
  //     //   console.log("REQUEST HAS BEEN ACCEPTED FOR TRIP ID: ", tripId)
  //     //   props.setRequestAccepted(true)
  //     //   console.log("CHAT SHOULD SHOW UP")
  //     // }
  //   })
  //   .then (() => {

  //   })
  // , [trip]})

  //function for sending messages
  function sendMessage (event) {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }



  return (
      <div className="outerContainer">
          <div className="chat-container">
            <InfoBar otherUserName={otherUserName}/>
            <Messages messages={messages} name={props.name} />
            <Input 
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
      </div>


  )
}