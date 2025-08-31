// src/pages/ChatPage.js
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import axios from 'axios';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [users,setUsers]=useState([])

  useEffect(() => {
  const fetchFriends = async () => {
    try {
      console.log("request sent");
      const res = await axios.get("https://chat-backend-y218.onrender.com/api/auth/getfrnds", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // if you use token
        },
      });
     
      setUsers(res.data.friends); 
      console.log("users are",users)
    } catch (err) {
      console.error("Error fetching friends:", err);
    }
  };

  fetchFriends();
}, []);


  return (
    <div className="h-screen flex">
      <Sidebar users={users} onSelectUser={setSelectedUser} />
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
};

export default ChatPage;
