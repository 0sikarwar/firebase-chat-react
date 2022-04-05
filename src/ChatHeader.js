import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "./app";
import DefaultAvatar from "./DefaultAvatar";
import { fetchStatus } from "./firebaseHelper";

const ChatHeader = () => {
  const { selectedUser, setIsChatOpen } = useContext(ChatContext);
  const [status, setStatus] = useState("offline");
  async function init() {
    fetchStatus(selectedUser, setStatus);
  }
  useEffect(() => {
    selectedUser && init();
  }, [selectedUser]);
  return (
    <div class="chat-head row align-center">
      <div class="chat-head-info row align-center">
        {selectedUser ? (
          <>
            {selectedUser.avatar ? (
              <img src={selectedUser.avatar} alt="Avatar" class="profile-img" />
            ) : (
              <DefaultAvatar />
            )}
            <div>
              <p class="message-username">{selectedUser.name}</p>
              {status === "online" ? (
                <p class="online">
                  <span class="glow-green"></span>Online
                </p>
              ) : (
                <p class="offline">
                  <span class="glow-red"></span>Offline
                </p>
              )}
            </div>
          </>
        ) : (
          <h2>Logo</h2>
        )}
      </div>
      <div onClick={() => setIsChatOpen(false)}>
        <Close />
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
