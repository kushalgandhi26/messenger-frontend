import React from 'react'
import ChatInput from './ChatInput'


function Chatcontainer({selectedUser,user}) {
  
  return (
    <div>
      <ChatInput user={user} selectedUser={selectedUser}/>
    </div>
    
  )
}

export default Chatcontainer