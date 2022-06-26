import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput'
import { v4 as uuidv4 } from "uuid"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight:"85.6%"
  },
  selfMessege: {
    alignSelf: "flex-end",
    margin: "5px 10px",
    textAlign: "center",
    color: "white",
    backgroundColor: "#2516f5",
    borderRadius: "8px",
    padding: "10px",
    minWidth: "50px",
  },
  friendMessege: {
    alignSelf: "flex-start",
    margin: "5px 10px",
    textAlign: "center",
    color: "white",
    backgroundColor: "#6b61f2",
    borderRadius: "8px",
    padding: "10px",
    minWidth: "50px",
  },
}));

function Chatcontainer({ selectedUser, user, socket }) {
  const classes = useStyles();
  const [allmessages, setallmessages] = useState([])
  const [arrivalMessage, setarrivalMessage] = useState(null)

  const scrollRef = useRef()
  useEffect(() => {
    fetchAllMessages()
    // eslint-disable-next-line
  }, [selectedUser])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setarrivalMessage({ from: false, message: msg })
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    arrivalMessage && setallmessages((prev) => [...prev, arrivalMessage])
    // eslint-disable-next-line
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
    // eslint-disable-next-line
  }, [allmessages])


  const fetchAllMessages = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/getmessages`, {
        method: 'POST',
        body: JSON.stringify({ from: user._id, to: selectedUser._id }),
        headers: {
          'Content-Type': 'application/json',
          'token': user.token
        }
      })
      const response = await res.json()
      setallmessages(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={classes.chatContainer}>
        {allmessages.map((msg) => {
          if (msg.fromSelf === true)
            return (
              <div ref={scrollRef} key={uuidv4()} className={classes.selfMessege}>{msg.message}</div>
            )
          return (
            <div ref={scrollRef} key={uuidv4()} className={classes.friendMessege}>{msg.message}</div>
          )
        })}
      </div>
      <ChatInput user={user} selectedUser={selectedUser} socket={socket} allmessages={allmessages} setallmessages={setallmessages} />
    </>
  )
}

export default Chatcontainer