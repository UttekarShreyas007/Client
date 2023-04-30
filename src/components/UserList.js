import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`).then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
