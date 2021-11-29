import moment from 'moment';
import { useSelector } from 'react-redux';
import '../styles/components/Chat.scss';

function ChatMessageListItem(props){
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const username = props.message.name;
  const time = moment(props.message.created_at).format("YYYY/MM/DD hh:mm a");
  const messageContent = props.message.message_text;
  const loggedIn = props.message.user_id === userInfo._id ? true : false;

  return (
    <div className="message-container ">
    {loggedIn ? (
      <div className="message-box logged-in">
        <div className="sent-text-header">
          <p className="message-sender">{username}</p>
          <p className="message-time">{time}</p>
        </div>
        <p className="message-text mine">{messageContent}</p>
      </div>
      ) : (
      <div className="message-box">
      <div className="sent-text-header">
        <p className="message-time">{time}</p>
        <p className="message-sender">{username}</p>
      </div>
      <p className="message-text not-mine">{messageContent}</p>  
      </div>
    )}
  </div>
);
} 

export default ChatMessageListItem;