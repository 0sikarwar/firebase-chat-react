import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./app";
import { fetchMsgs, saveMsg } from "./firebaseHelper";

const MessagesList = () => {
  const { selectedUser } = useContext(ChatContext);
  const [msgText, setMsgText] = useState("");
  const [msgList, setMsgList] = useState([]);
  const msgEndRef = useRef();
  const selectedUid = selectedUser.uid;
  function hendleSendMsg() {
    saveMsg(msgText, selectedUid);
    setMsgText("");
  }
  useEffect(() => {
    fetchMsgs(selectedUid, setMsgList);
  }, []);
  useEffect(() => {
    msgList.length && msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgList]);
  return (
    <div>
      <div className="messages-overflow">
        <div className="chat-messages">
          {msgList.map((msg, index) => {
            return (
              <p className={`chat-message message-${msg.from === selectedUid ? "received" : "sent"}`} key={index}>
                {msg.text}
              </p>
            );
          })}
          <div ref={msgEndRef} />
        </div>
      </div>
      <div className="message-write row align-center  justify-between">
        <input
          type="text"
          name="message"
          placeholder="Message Text"
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
          onKeyUp={(e) => (e.which === 13 || e.keyCode === 13 || e.key === "Enter") && hendleSendMsg()}
        />
        <SendIcon onClick={hendleSendMsg} />
      </div>
    </div>
  );
};
const SendIcon = ({ onClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 495.003 495.003"
      version="1.1"
      viewBox="0 0 495.003 495.003"
      xmlSpace="preserve"
      className="send-icon"
      width={22}
      height={22}
      onClick={onClick}
    >
      <g>
        <path d="M164.711 456.687a8.007 8.007 0 004.266 7.072 7.992 7.992 0 008.245-.468l55.09-37.616-67.6-32.22v63.232z"></path>
        <path d="M492.431 32.443a8.024 8.024 0 00-5.44-2.125 7.89 7.89 0 00-3.5.816L7.905 264.422a14.154 14.154 0 00.153 25.472L133.4 349.618l250.62-205.99-219.565 220.786 156.145 74.4a14.115 14.115 0 006.084 1.376c1.768 0 3.519-.322 5.186-.977a14.188 14.188 0 007.97-7.956l154.596-390a7.968 7.968 0 00-2.005-8.814z"></path>
      </g>
    </svg>
  );
};
export default MessagesList;
