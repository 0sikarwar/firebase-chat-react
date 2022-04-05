import React, { useContext } from "react";
import { ChatContext } from "./app";

const ChatToggle = () => {
  const { setIsChatOpen } = useContext(ChatContext);
  return (
    <div className="chat-toggles">
      <div className="extra-toggles"></div>
      <div className="chat-toggle-container" onClick={() => setIsChatOpen(true)}>
        <ChatIcon className="chat-toggle" />
      </div>
    </div>
  );
};
const ChatIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
      />
    </svg>
  );
};

export default ChatToggle;
