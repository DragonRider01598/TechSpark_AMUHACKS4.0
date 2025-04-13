import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Background from './Background_main';
import toast from 'react-hot-toast';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  document.title = "AgriConnect - Sign Up";

  const [preview, setPreview] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        // alert("Registration Successful");
        toast.success("Registered successfully")
        navigate('/');
      } else {
        toast.error("Error: Email or udename already exists")
        // alert("Error: Email or udename already exists");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Something went wrong!")
      // alert("Something went wrong!");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="flex flex-row items-center justify-evenly h-screen relative">
    <Background />
    {/* Logo Section */}
    <div className="flex flex-col items-center justify-center w-1/3 pr-10">
      <h1 className="text-6xl font-pixelify font-extrabold text-[#083426] drop-shadow-md">AgriConnect</h1>
      <p className="text-lg text-green-900 text-center mt-4">Bridging Farmers & Buyers for a Sustainable Future</p>
    </div>

      {/* Sign Up Form Container */}
      <div className="bg-white bg-opacity-20 backdrop-blur-lg -mt-11 p-6 rounded-xl shadow-2xl w-2/5 border border-[#e6f0ed79]">
  <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Join the AgriConnect Community</h2>
  <div className="space-y-3">
    <input
      type="text"
      placeholder="Full Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full p-2 rounded-lg bg-white bg-opacity-30 text-gray-700 border border-[#e6f0ed79] focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md"
    />
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full p-2 rounded-lg bg-white bg-opacity-30 text-gray-700 border border-[#e6f0ed79] focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md"
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 rounded-lg bg-white bg-opacity-30 text-gray-700 border border-[#e6f0ed79] focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 rounded-lg bg-white bg-opacity-30 text-gray-700 border border-[#e6f0ed79] focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md"
    />

    {/* Image Upload */}
    <div {...getRootProps()} className="w-full h-10 flex items-center justify-center border-2 border-dashed border-[#e6f0ed79] rounded-lg bg-white bg-opacity-30 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e6f0ed79] backdrop-blur-md relative">
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Profile Preview" className="w-5 h-5 object-cover rounded-full border-2 border-green-500" />
      ) : (
        <FaCamera className="text-green-500 text-3xl" />
      )}
    </div>

    <button 
      onClick={handleRegister} 
      className="w-full py-2 bg-green-700 bg-opacity-80 text-white font-bold rounded-lg hover:bg-green-800 transition duration-300 shadow-lg"
    >
      Sign Up
    </button>
  </div>
  
  <p className="text-center text-gray-700 mt-3">
    Already have an account? 
    <a href="/login" className="text-green-800 font-semibold hover:underline"> Login</a>
  </p>
</div>

    </div>
  );
};

export default RegisterPage;