import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { io } from 'socket.io-client';

import InfoBar from "./InfoBar";
import Messages from './Messages';
import Input from './Input';
// import TextContainer from './TextContainer';

import "./Chat.css"

let socket;

const messageData = [
  {
    id: 1,
    user: "A",
    text: "Hello",
    created_at: "1:00PM"
  },
  {
    id: 2,
    user: "B",
    text:"Hi, how are you?",
    created_at: "2:00PM"
  }, {
    id: 3,
    user: "A",
    text: "I'm good hbu?",
    created_at: "3:00PM"
  }, {
    id: 4,
    user: "B",
    text: "pretty good!",
    created_at: "4:00PM"
  } 
]

export default function Chat () {
  const [ trip, setTrip ] = useState({});
  const [ customerId, setCustomerId] = useState("");
  const [ name, setName ] = useState("driver");
  const [room, setRoom ] = useState("")
  const [ message, setMessage ] = useState("");
  const [ messages, setMessages ] = useState([]);
  // const [ messages, setMessages ] = useState([]);
  const tripAPI = "http://localhost:3001/trips/2" //api endpoint to get the trip data that matches user_id === driver_id AND accepted === true AND ended_at === null (meaning the trip didn't end yet)


  useEffect(()=> {
    Axios.get(tripAPI)
      .then((res) => {
        console.log(res.data);
        setTrip(res.data)
        setCustomerId(res.data.customer_id);
        setRoom(res.data.id)
      })
  },[]);

  useEffect(() => {
    socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"]
    });

    socket.emit("join", { name: 'driver', room: 'chat' })

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
          <InfoBar customer={customerId}/>
          <Messages messages={messages} name={name} />
          <Input 
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
    </div>
    

  )
}