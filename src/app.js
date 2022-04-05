import React, { createContext, useEffect, useState } from "react";
import ChatToggle from "./ChatToggle";
import "./chat.css";
import ChatWindow from "./ChatWindow";
import { currentUserId, getUsers, markReadLastMsg } from "./firebaseHelper";
export const ChatContext = createContext();

const FiresbaseChatReact = ({ config }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
  useEffect(() => {
    if (!isChatOpen) {
      setSelectedUser(null);
      setSelectedUserIndex(-1);
    }
  }, [isChatOpen]);
  async function handleSelectUser() {
    if (selectedUserIndex > -1 && users.length) {
      setSelectedUser({ ...users[selectedUserIndex] });
      await markReadLastMsg(users[selectedUserIndex].uid);
    }
  }
  useEffect(() => {
    handleSelectUser();
  }, [selectedUserIndex, users]);
  useEffect(() => {
    const unsubSnapshot = getUsers(setUsers);
    return () => unsubSnapshot();
  }, []);
  if (!currentUserId()) {
    console.error("No user defined for firebase chat")
    throw ("Use loginUser then load the chat")
    return
  }
  return (
    <ChatContext.Provider
      value={{ users, selectedUser, setSelectedUser, isChatOpen, setIsChatOpen, setSelectedUserIndex }}
    >
      <div>
        <ChatToggle />
        <ChatWindow />
      </div>
    </ChatContext.Provider>
  );
};

export default React.memo(FiresbaseChatReact);
