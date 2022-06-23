import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Picker from "emoji-picker-react"
import { BsEmojiSmileFill } from "react-icons/bs"
import { IoMdSend } from "react-icons/io"

const useStyles = makeStyles((theme) => ({

    container: {
        position: "absolute",
        bottom: "20px",
    },
    chatContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: {
        margin: "0 10px auto",
        paddingTop: "2px",
        cursor: "pointer"
    }
}));

function ChatInput({selectedUser,user}) {

    const classes = useStyles();
    const [showEmoji, setshowEmoji] = useState(false)
    const [msg, setmsg] = useState("")

    const handleEmojiPanel = () => {
        setshowEmoji(!showEmoji)
    }

    const handleEmojoClick = (event, emoji) => {
        let newMsg = msg;
        newMsg += emoji.emoji
        setmsg(newMsg)
    }

    const handleChange = (e) => {
        setmsg(e.target.value)
    }

    const sendMessage = async(e) => {
        e.preventDefault()
        if(msg.length > 0){
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/send`,{
                    method:'POST',
                    body:JSON.stringify({from:user._id,to:selectedUser._id,msg:msg}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                const response = await res.json();
                console.log(response)
            } catch (error) {
                console.error(error)
            }
            
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.chatContainer}>
                <div className={classes.emoji} onClick={handleEmojiPanel}>
                    {showEmoji && <Picker onEmojiClick={handleEmojoClick} />}
                    <BsEmojiSmileFill />
                </div>
                <form>
                    <input onChange={(e) => handleChange(e)} value={msg} type="text" id="chat-input" name="chat-input" placeholder='Enter message' />
                    <button onClick={sendMessage}><IoMdSend /></button>
                </form>
            </div>
        </div>
    )
}

export default ChatInput