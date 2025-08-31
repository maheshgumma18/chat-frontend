import React from "react";
import { User } from "lucide-react";

const Profile = ({ name }) => {
  return (
    <div className="flex items-center space-x-2 mr-3">
      <User className="w-6 h-6" />
      <span>{name}</span>
    </div>
  );
};

export default Profile;
