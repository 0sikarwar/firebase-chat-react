import React, { useContext } from "react";
import { ChatContext } from "./app";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import UsersList from "./UsersList";

const ChatWindow = (props) => {
  const { selectedUser, isChatOpen } = useContext(ChatContext);
  return (
    <div className="chats-container">
      <div className={`chat-window chat-history-window ${isChatOpen ? "chat-window-show" : ""}`}>
        <ChatHeader {...props}/>
        <div className="chat-content">
          <div className="messages-overflow">{selectedUser ? <MessagesList /> : <UsersList defaultAvatar={props.defaultAvatar}/>}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
