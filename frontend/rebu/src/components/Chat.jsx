import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { io } from 'socket.io-client';

import { Accordion, Card, Button } from 'react-bootstrap';
import "./Chat.scss"

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"]
});

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
  const [ customerName, setCustomerName] = useState("");
  const [ message, setMessage ] = useState("");
  // const [ messages, setMessages ] = useState([]);
  const tripAPI = "http://localhost:3001/trips/2"

  const messages = messageData.map(msg => {
    return (
      <div key={msg.id} className="message">
        {`${msg.user}: ${msg.text}`}
      </div>
    )
  })
  useEffect(()=> {
    Axios.get(tripAPI)
      .then((res) => {
        console.log(res.data);
        setTrip(res.data)
        setCustomerName(res.data.customer_id);
      })
  },[]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      console.log("Rooms: ", socket.rooms)
    })

    socket.on("hello", (arg) => {
      console.log(arg);
    })




  }, [customerName])
  // useEffect(() => {
  //   socket = io(ENDPOINT);
  //   socket.emit('join', { customer_name : customerName })
  // },[])

  return (
    <div className="chat-container">
      <Accordion>
        <Card className="parent-message-container">
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <div className="message-container">
              <div>
                {messages}
              </div>
              <div className="send-message-container">
                <div className="new-message-container">
                  <textarea className="message-input" type="text"/>
                </div>
                <div className="btn btn-primary">Send</div>
              </div>
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}