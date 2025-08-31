// src/pages/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login with:", { email, password });
     try {
    const res = await axios.post("https://chat-backend-y218.onrender.com/api/auth/login", {
      email,
      password,
    });

    if (res.status === 200) {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('myid',res.data.user.id)
        localStorage.setItem('name',res.data.user.name)
      navigate("/chat");
    }
  } catch (err) {
    if (err.response) {
      console.error("Signup failed:", err.response.data);
      alert(err.response.data.msg); // show server message
    } else {
      console.error("Error:", err.message);
    }
  }

    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
