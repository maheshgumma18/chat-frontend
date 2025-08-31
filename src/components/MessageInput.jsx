import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    
    try{
    if (text.trim() !== "") {
      onSend(text);
     setText("")
  
}


   }catch(err){
    console.log(err)
   }

    
  };

  return (
    <div className="flex items-center p-3 border-t bg-white">
      <input
        type="text"
        className="flex-1 p-2 border rounded-lg focus:outline-none"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        onClick={handleSend}
      >
        <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
      </button>
    </div>
  );
};

export default MessageInput;
