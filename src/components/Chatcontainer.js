import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import {v4 as uuidv4} from "uuid"


function Chatcontainer({ selectedUser, user, socket }) {
  const [allmessages, setallmessages] = useState([])
  const [arrivalMessage, setarrivalMessage] = useState(null)

  const scrollRef = useRef()
  useEffect(() => {
    fetchAllMessages()
    // eslint-disable-next-line
  }, [selectedUser])

  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive",(msg) => {
        setarrivalMessage({from:false,message:msg})
      })
    }
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    arrivalMessage && setallmessages((prev) => [...prev,arrivalMessage])
    // eslint-disable-next-line
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
    // eslint-disable-next-line
  },[allmessages])
  

  const fetchAllMessages = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/getmessages`, {
        method: 'POST',
        body: JSON.stringify({ from: user._id, to: selectedUser._id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const response = await res.json()
      setallmessages(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      {allmessages.map((msg) => {
        if (msg.fromSelf === true)
          return (
            <div ref={scrollRef} key={uuidv4()} style={{ color: "red" }}>{msg.message}</div>
          )
        return (
          <div ref={scrollRef} key={uuidv4()}>{msg.message}</div>
        )
      })}
      <ChatInput user={user} selectedUser={selectedUser} socket={socket} allmessages={allmessages} setallmessages={setallmessages} />
    </div>

  )
}

export default Chatcontainer