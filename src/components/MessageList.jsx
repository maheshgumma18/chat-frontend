import {useRef,useEffect} from 'react';
import React from 'react';

const MessageList = ({ messages, currentUser }) => {

  const messagesEndRef=useRef(null)
const myid=localStorage.getItem("myid")
useEffect(()=>{
    if(messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({behavior:'smooth'})
    }
},[messages])
  
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex mb-2 ${msg.senderId === myid ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs ${
              msg.senderId === currentUser ? "bg-blue-500 text-white" : "bg-white text-gray-800 shadow"
            }`}
          >
            <p>{msg.message}</p>
          </div>
        </div>
      ))}
       <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
