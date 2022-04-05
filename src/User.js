import React, { useEffect, useState } from "react";
import DefaultAvatar from "./DefaultAvatar";
import { fetchLastMsg } from "./firebaseHelper";

const User = ({ user, onClick }) => {
  const [lastMsg, setLastMsg] = useState(null);
  useEffect(() => {
    const unsub = fetchLastMsg(user.uid, setLastMsg);
    return () => unsub();
  }, []);
  return (
    <div className="message-history row align-center" onClick={onClick}>
      {user.avatar ? <img src={user.avatar} alt="Avatar" /> : <DefaultAvatar />}
      <div>
        <p className="message-name">{user.name}</p>
        {!!lastMsg && (
          <p className="message-content">
            {lastMsg.to === user.uid ? "Me: " : ""}
            {lastMsg.text}
          </p>
        )}
      </div>
      {lastMsg?.from === user?.uid && lastMsg?.unread && <span className="message-read" />}
    </div>
  );
};

export default User;
