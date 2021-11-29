import ScrollToBottom from "react-scroll-to-bottom";

import ChatMessageListItem from "./ChatMessageListItem";
import { useSelector } from 'react-redux';

// We use react-scroll-to-bottom here. It auto scrolls to bottom when height of messages exceeds the height of the container.
const ChatMessageList = (props) => {
  return (
    <ScrollToBottom className="all-messages">
      {props.messages && props.messages.map((message) => (
        <ChatMessageListItem key={message._id} message={message} />
      ))}
    </ScrollToBottom>
  );
};

export default ChatMessageList;