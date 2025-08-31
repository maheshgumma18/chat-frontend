import { UserCircleIcon } from "@heroicons/react/24/solid";

const Sidebar = ({ users, onSelectUser }) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">Chats</div>
      <div className="flex-1 overflow-y-auto">
        {users.map((user, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer"
            onClick={() => onSelectUser(user)}
          >
            <UserCircleIcon className="w-8 h-8 text-gray-400" />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
