import moment from 'moment';
import { useSelector } from 'react-redux';

function ChatMessageListItem(props){
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const username = userInfo.name;
  const time = moment(props.message.created_at).format("YYYY/MM/DD hh:mm a");
  const messageContent = props.message.message_text;

  return (
    <div>
    {userInfo ? (
    <div className="message-container ">
      <div className="message-box logged-in">
        <div className="sent-text-header">
          <p className="message-sender">{username}</p>
          <p className="message-time">{time}</p>
        </div>
        <p className="message-text mine">{messageContent}</p>
      </div>
    </div>
  ) : (
    <div className="message-container">
      <div className="message-box">
      <div className="sent-text-header">
        <p className="message-time">{time}</p>
        <p className="message-sender">{username}</p>
      </div>
      <p className="message-text not-mine">{messageContent}</p>  
      </div>
    </div>
  )}
</div>
);
} 

export default ChatMessageListItem;