import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; // for cross icon

export default function SearchUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const isFrnd =(id)=>{
    return false
  }

  const addFrnd= async (id)=>{
     try{
        const token = localStorage.getItem("token");
   
        const res = await axios.post(
  "https://chat-backend-y218.onrender.com/api/auth/addfrnd",
  { userid: id }, // ✅ send in body
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
        console.log("user added succesfully",res)
     }catch(err){
        console.log(err)
     }
  }
  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axios.get("http://localhost/api/auth/search", {
        params: { username: query },
      });
      setResults(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="p-2 max-w-xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="🔍 Search username..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="absolute mt-5 w-auto h-auto p-4 ">
          {results.length > 0 ? (
            <div className="flex flex-col max-h-80 w-80 overflow-y-auto p-1 gap-1">
              {results.map((user) => (
                <div
                  key={user._id}
                  className="bg-white shadow-md rounded-3xl p-3 border hover:shadow-lg hover:-translate-y-1 transition transform"
                >
                  <p className="flex justify-around font-semibold text-sm text-gray-800">
                    {user.name}
                    
                     {!isFrnd(user._id)?<button  onClick={()=>addFrnd(user._id)}  className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition">Add</button>:<button className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition">Message</button>}
                    
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-between bg-red-50 border border-red-300 rounded-xl p-4 shadow-sm">
              <span className="text-red-600 font-medium">
                No users found
              </span>
              <button
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-red-200 transition"
              >
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
