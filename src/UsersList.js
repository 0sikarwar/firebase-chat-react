import React, { useContext } from "react";
import { ChatContext } from "./app";
import User from "./User";

const UsersList = () => {
  const { users, setSelectedUserIndex } = useContext(ChatContext);
  return (
    <div className="all-messages">
      {users.map((user, index) => {
        return <User user={user} onClick={() => setSelectedUserIndex(index)} key={index} />;
      })}
    </div>
  );
};

export default UsersList;
