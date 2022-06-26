import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Picker from "emoji-picker-react"
import { BsEmojiSmileFill } from "react-icons/bs"
import { IoMdSend } from "react-icons/io"


const useStyles = makeStyles((theme) => ({
    container: {
        display: "grid",
        gridTemplateColumns: "6% 94%",
        height: "30px"
    },
    inContainer: {
        display: "grid",
        gridTemplateColumns: "91% 9%"
    },
    chatInput: {
        borderRadius: "12px",
        paddingLeft: "13px",
        background: "#b3d1ff",
        border: "none",
        outline: "none"
    },
    sendButton: {
        background: "#4d94ff",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer"
    },
    emoji: {
        textAlign: "center",
        paddingTop: "3px",
        fontSize: "larger",
        cursor: "pointer",
        color: "#e6e600"
    }
}));

function ChatInput({ selectedUser, user, socket, allmessages, setallmessages }) {

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

    const sendMessage = async (e) => {
        e.preventDefault()
        if (msg.length > 0) {
            try {
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/send`, {
                    method: 'POST',
                    body: JSON.stringify({ from: user._id, to: selectedUser._id, msg: msg }),
                    headers: {
                        'Content-Type': 'application/json',
                        'token': user.token
                    }
                })
                socket.current.emit("send-msg", {
                    to: selectedUser._id,
                    from: user._id,
                    message: msg
                })
                setmsg("")
                const msgs = [...allmessages]
                msgs.push({ fromSelf: true, message: msg })
                setallmessages(msgs)
            } catch (error) {
                console.error(error)
            }

        }
    }

    return (
        <>
        {showEmoji && <Picker onEmojiClick={handleEmojoClick} />}
        <div className={classes.container}>
            <div className={classes.emoji} onClick={handleEmojiPanel}>
                <BsEmojiSmileFill />
                
            </div>
            <form className={classes.inContainer}>
                <input onSubmit={sendMessage} className={classes.chatInput} onChange={(e) => handleChange(e)} value={msg} type="text" id="chat-input" name="chat-input" placeholder='Enter message' />
                <button className={classes.sendButton} onClick={sendMessage}><IoMdSend /></button>
            </form>
        </div>
        </>
    )
}

export default ChatInput