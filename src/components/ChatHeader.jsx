import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import SearchUser from "./SearchUser";
import Profile from "./profile";
const ChatHeader = ({ selectedUser,online }) => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white shadow h-auto">
      <h2 className="font-semibold text-lg">{selectedUser?.name || "Select a chat"}</h2>
      {online.includes(selectedUser?._id) ? <span class="inline-block w-3 h-3 bg-green-500 rounded-full ml-3"></span> :<div className="ml-3 font-bold">offline</div>}
      <SearchUser/>
      <Profile className="mr-4" name={localStorage.getItem('name').split(" ")[0]} />
      <EllipsisVerticalIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
      
    </div>
  );
};

export default ChatHeader;
