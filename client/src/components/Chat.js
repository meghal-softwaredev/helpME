import { useState, useEffect } from "react";
import { io } from "socket.io-client"; // Browser-side socket.io
import axios from "axios";
import ChatMessageList from "../components/ChatMessageList";
import ChatInput from "../components/ChatInput";
import "../styles/components/Chat.scss";
import { useSelector } from 'react-redux';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { IconButton } from "@mui/material";
import { display } from '@mui/system';

let socket;

export default function Chat(props) {
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState(""); // For the ChatInput form
  const ENDPOINT = "localhost:5000";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    socket = io(ENDPOINT, { 
      transports: ["websocket"] 
    });
    socket.on('connect', function() {
      console.log('connected!');
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (newMessageObj) => {
      setMessageHistory([...messageHistory, newMessageObj]); // Do not use prev here, it will show multiple messages on the non-typing browser!
    });
  }, [messageHistory]);

  // Function to send messages
  const sendMessage = (event) => {
    if (message) {
      let newMessageObj = {
        user_id: userInfo._id,
        name: userInfo.name,
        message_text: message,
      };

      setMessageHistory((prev) => [...prev, newMessageObj]); // This should go inside socket.on but it works
      socket.emit("sendMessage", { ...newMessageObj }, () => setMessage("")); // This callback clears the input
    }
  };

  return (
    <div className="user-chats">
      {userInfo && 
      <div style={{display:'flex'}}>
        <h1>Welcome to the chat, {userInfo.name}!  </h1>
        <IconButton size="large" sx={{color:"green"}}>
          <VideoCameraFrontIcon />
        </IconButton>
      </div>
      }
      <div className="chat-container">
        <ChatMessageList messages={messageHistory} />
        <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
