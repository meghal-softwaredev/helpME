import React from "react";
import { TextField, Button } from '@mui/material';

const ChatInput = (props) => {
  const { message, setMessage, sendMessage } = props;

  return (
    <div className="chat-input">
      <TextField
          id="outlined-multiline-static"
          className="input"
          multiline
          variant="outlined"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          // Pressing enter sends the message
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
          InputProps={{
            style: { borderRadius: '5px 0 0 5px', color: "black" },
          }}
          inputProps={{
            maxLength: 255,
          }}
        />
      <Button className="send-button" onClick={(event) => sendMessage(event)} style={{borderRadius: '0 5px 5px 0'}}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
