import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./app";
import DefaultAvatar from "./DefaultAvatar";
import { fetchStatus } from "./firebaseHelper";

const ChatHeader = (props) => {
  const { selectedUser, setIsChatOpen } = useContext(ChatContext);
  const [status, setStatus] = useState("offline");
  async function init() {
    fetchStatus(selectedUser, setStatus);
  }
  useEffect(() => {
    selectedUser && init();
  }, [selectedUser]);
  return (
    <div className="chat-head row align-center">
      <div className="chat-head-info row align-center">
        {selectedUser ? (
          <>
            {selectedUser.avatar ? (
              <img src={selectedUser.avatar} alt="Avatar" className="profile-img" />
            ) : (
              props.defaultAvatar || <DefaultAvatar />
            )}
            <div>
              <p className="message-username">{selectedUser.name}</p>
              {status === "online" ? (
                <p className="online">
                  <span className="glow-green"></span>Online
                </p>
              ) : (
                <p className="offline">
                  <span className="glow-red"></span>Offline
                </p>
              )}
            </div>
          </>
        ) : (
          props.websiteLogo || <h2>Logo</h2>
        )}
      </div>
      <div onClick={() => setIsChatOpen(false)}>
        {props.closeIcon || <Close />}
      </div>
    </div>
  );
};

const Close = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="chat-close"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#fff"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export default ChatHeader;
