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



  const isUserDriver = props.driver;


  useEffect(()=> {
    console.log("IS USER DRIVER? :", isUserDriver)
    if (isUserDriver && props.acceptedTrip) {
      setOtherUserName(props.acceptedTrip.customer_name)
      setRoom(props.acceptedTrip.id)
    } else if (!isUserDriver && props.acceptedTrip) {
      console.log("DRIVER NAME ON ACCEPTED TRIP: ", props.acceptedTrip.driver_name)
      setOtherUserName(props.acceptedTrip.driver_name)
      setRoom(props.acceptedTrip.id)
    }
  },[props.acceptedTrip]);

  useEffect(() => {
    if (props.name && room && props.acceptedTrip ) {
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