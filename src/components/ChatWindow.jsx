import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useState, useEffect } from "react";
import axios from "axios";
import {io} from "socket.io-client"


const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  const userId = localStorage.getItem("myid");
  socket.emit("register", { userId }); 
});

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
 const [online,setOnline]=useState([])
  // ✅ Fetch all messages when user changes
  useEffect(() => {

    if (!selectedUser) return;

    const getMsg = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:5000/api/auth/allmsg",
          { userid: selectedUser?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMsg();
  }, [selectedUser]);

useEffect(() => {
    // Receive messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

   socket.on('onlineusers',(data)=>{
    console.log("the online users are",data)
         setOnline(data)
   })
    
    
    return () => {
      socket.off("receiveMessage");
    };
  }, []);



  // ----------------------------------------------------------------------------------------------------------------


  // ✅ Handle send message
  const handleSend = async (text) => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    // Temporary optimistic message
    const newMessage = {
      message: text,
      senderId: localStorage.getItem('myid'), // replace with actual logged in user id
      receiverId: selectedUser._id,
      createdAt: new Date().toISOString(),
    };
    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Call API to store message
      const res = await axios.post(
        "http://localhost:5000/api/auth/sendmsg",
        {
          userid: selectedUser._id,
          msg: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Optionally replace temp msg with backend msg
      setMessages((prev) => [...prev.slice(0, -1), res.data]);
    } catch (error) {
      console.error("Message not sent:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <ChatHeader selectedUser={selectedUser} online={online}/>
      <MessageList messages={messages} currentUser={localStorage.getItem('myid')} />
      <MessageInput onSend={handleSend}  />
    </div>
  );
};

export default ChatWindow;
