
import Navbar from "../../components/Navbar/Navbar"
import React from 'react'
/* import Chatbot from '../../components/Chatbot/Chatbot';
 */import ChatComponent from "../../components/Chat/ChatComponent";

// ADDING THE CHAT FEATURE AS A SEPARATE PAGE INSIDE THE APP
const Chat = () => {
  return (
   <>
   <Navbar/>
    <ChatComponent/>
 </>
  )
}

export default Chat