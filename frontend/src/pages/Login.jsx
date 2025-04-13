import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from './Background_main';
import toast from 'react-hot-toast';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Logged in successfully")
        navigate("/"); // Redirect to dashboard
      } else {
        setError(data.message || "Invalid email or password");
        toast.error("Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.")
    }
  };

  return (
    
    <div className="flex flex-row items-center justify-evenly h-screen relative">
      <Background />
      {/* Logo Section */}
      <div className="flex flex-col items-center justify-center w-1/3 pr-10">
        <h1 className="text-6xl font-pixelify font-extrabold text-[#083426] drop-shadow-md">AgriConnect</h1>
        <p className="text-lg text-green-900 text-center mt-4">Bridging Farmers & Buyers for a Sustainable Future</p>
      </div>

      {/* Login Form */}
      {/* <div className="bg-white p-8 rounded-xl shadow-2xl w-2/5 border-4 border-green-600">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Welcome Back!</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-green-100 text-gray-700 border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600" />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-green-100 text-gray-700 border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600" />

          <button type="submit" className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300 shadow-lg">
            Login
          </button>
        </form>
        <p className="text-center text-gray-700 mt-4">Don't have an account? <a href="/register" className="text-green-800 font-semibold hover:underline">Sign Up</a></p>
      </div> */}
  <div className="bg-white bg-opacity-30 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-2/5">
  <h2 className="text-3xl font-bold text-center text-[#083426] mb-6">Welcome Back!</h2>
  {error && <p className="text-red-600 text-center mb-4">{error}</p>}
  <form onSubmit={handleLogin} className="space-y-4">
    <input 
      type="email" 
      placeholder="Email" 
      value={email} 
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md" 
    />

    <input 
      type="password" 
      placeholder="Password" 
      value={password} 
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-3 rounded-lg bg-white bg-opacity-30 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#32353427] backdrop-blur-md" 
    />

    <button 
      type="submit" 
      className="w-full py-3 bg-green-700 bg-opacity-80 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300 shadow-lg"
    >
      Login
    </button>
  </form>
  <p className="text-center text-gray-700 mt-4">
    Don't have an account? 
    <a href="/register" className="text-green-800 font-semibold hover:underline"> Sign Up</a>
  </p>
</div>

    </div>
  );
};

export default LoginPage;