import React, { useContext } from "react";
import { ChatContext } from "./app";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import UsersList from "./UsersList";

const ChatWindow = () => {
  const { selectedUser, isChatOpen } = useContext(ChatContext);
  return (
    <div className="chats-container">
      <div className={`chat-window chat-history-window ${isChatOpen ? "chat-window-show" : ""}`}>
        <ChatHeader />
        <div className="chat-content">
          <div className="messages-overflow">{selectedUser ? <MessagesList /> : <UsersList />}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
