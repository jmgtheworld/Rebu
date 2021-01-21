import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { io } from 'socket.io-client';

import InfoBar from "./InfoBar";
import Messages from './Messages';
import Input from './Input';
// import TextContainer from './TextContainer';

import "./Chat.css"

let socket;

export default function Chat (props) {
  const [ trip, setTrip ] = useState({});
  const [ otherUserName, setOtherUserName] = useState("");
  const [room, setRoom ] = useState("")
  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState([]);
  // const [ messages, setMessages ] = useState([]);
  const tripAPI = "http://localhost:3001/trips/2" //api endpoint to get the trip data that matches token === driver_id AND accepted === true AND ended_at === null (meaning the trip didn't end yet)

  const isUserDriver = props.driver;


  useEffect(()=> {
    if (isUserDriver) {
      return Axios.get(tripAPI)
        .then((res) => {
          console.log(res.data);
          setTrip(res.data)
          setOtherUserName(res.data.customer_id);
          setRoom(res.data.id)
        })
    } else {
      return Axios.get(tripAPI)
        .then((res) => {
          console.log(res.data);
          setTrip(res.data)
          setOtherUserName(res.data.driver_id);
          setRoom(res.data.id)
        })
    }
  },[]);

  useEffect(() => {
    socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"]
    });

    socket.emit("join", { name: props.name , room: 'chat' })

    return () => {
      socket.emit('disconnection');
      socket.off();
    }

  }, [tripAPI])

  useEffect(() => {
    socket.on('message', (message) => {
      console.log("EMITTING MESSAGE SOCKET")
      setMessages([...messages, message]);
      console.log("MESSAGE EMITTED: ", message)
      
    })
  },[messages])


  //function for sending messages
  function sendMessage (event) {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  console.log("message: ", message)
  console.log("MESSAGES NOW: ", messages)

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