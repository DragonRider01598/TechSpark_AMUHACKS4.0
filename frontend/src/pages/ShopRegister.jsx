import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FaCamera, FaCheck } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
import useMarketStore from '../store/marketStore';
import toast from 'react-hot-toast';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ShopRegister = () => {

   const { authUser, authenticateUser } = useAuthStore();

   useEffect(() => {
      // Fetch market list from the backend
      const fetchMarkets = async () => {
         try {
            const response = await fetch(`${BACKEND_URL}/vendors/markets`);
            const text = await response.text(); // Read raw response

            const data = JSON.parse(text);
            setMarkets(data);
         } catch (error) {
            console.error("Error fetching markets:", error);
         }
      };
      fetchMarkets();
   }, []);

   useEffect(() => {
      if (!authUser) {
         authenticateUser();
      }
   }, [authUser]);


   const userId = authUser.userId;

   document.title = "AgriConnect - Register Shop";

   const [marketId, setMarketId] = useState('');
   const [shopName, setShopName] = useState('');
   const [address, setAddress] = useState('');
   const [latitude, setLatitude] = useState(null);
   const [longitude, setLongitude] = useState(null);
   const [images, setImages] = useState([]);
   const [imageData, setImageData] = useState([]);
   const [markets, setMarkets] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [filteredMarkets, setFilteredMarkets] = useState([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedMarket, setSelectedMarket] = useState(null);
   const [locationFetched, setLocationFetched] = useState(false);
   const [phone, setPhone] = useState('');



   const navigate = useNavigate();

   useEffect(() => {
      // Filter markets based on search input
      const temps = markets.filter(market => market.marketName.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredMarkets(temps);
   }, [searchTerm, markets]);



   const handleSelectMarket = (market) => {
      setMarketId(market._id);
      setSearchTerm(market.marketName);
      setSelectedMarket(market);
      setIsDropdownOpen(false);
   };

   const getCoordinates = async () => {
      if (!address) return;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;

      try {
         const response = await fetch(url);
         const data = await response.json();
         if (data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setLatitude(location.lat);
            setLongitude(location.lng);
            setLocationFetched(true);
         } else {
            // alert("Invalid address. Try again.");
            toast.error("Invalid address. Try again.")
         }
      } catch (error) {
         console.error("Geolocation error:", error);
      }
   };

   const onDrop = useCallback((acceptedFiles) => {
      const newImagePreviews = acceptedFiles.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImagePreviews]); // Keep previews for UI
      setImageData(prev => [...prev, ...acceptedFiles]); // Keep actual files for backend
   }, []);

   const removeImage = (index) => {
      setImages(prev => prev.filter((_, i) => i !== index));
      setImageData(prev => prev.filter((_, i) => i !== index));
   };

   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*', multiple: true });


   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!marketId || !shopName || !address || !latitude ||!phone|| !longitude || !locationFetched) {
         // alert("Please fill in all fields.");
         toast.error("Please fill in all fields.")
         return;
      }

      const formData = new FormData();
      formData.append("marketId", marketId);
      formData.append("shopName", shopName);
      formData.append("address", address);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("phone", phone); 
      formData.append("userId", userId);
      imageData.forEach((img) => formData.append(`files`, img));

      try {
         const response = await fetch(`${BACKEND_URL}/vendors/`, {
            method: "POST",
            body: formData,
            credentials: 'include',
         });

         const text = await response.text(); // Read raw response
         console.log(text)


         const data = JSON.parse(text);
         if (response.ok) {
            toast.success("Registered successfully")
            navigate("/");
         } else {
            toast.error("Registration failed")
            // alert(data.message || "Registration failed");
         }
      } catch (error) {
         console.error("Registration error:", error);
      }
   };

   // return (
   //    <div className="flex flex-row items-center justify-evenly min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-200 p-10">
   //       {/* Logo Section */}
   //       <div className="flex flex-col items-center justify-center w-1/3 pr-10">
   //          <h1 className="text-6xl font-pixelify font-extrabold text-yellow-800 drop-shadow-md">AgriConnect</h1>
   //          <p className="text-lg text-yellow-800 text-center mt-4">Bridging Farmers & Buyers for a Sustainable Future</p>
   //       </div>


   //       {/* Registration Form */}
   //       <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-xl w-2/5 border border-[#f9e79f] mt-6">
   //          <h2 className="text-3xl font-bold text-center text-yellow-800 mb-4">Register Your Shop</h2>
   //          <form onSubmit={handleSubmit} className="space-y-3">
   //             {/* Market Selection */}
   //             <div className="relative">
   //                {/* Search Input */}
   //                <input
   //                   type="text"
   //                   placeholder="Search Market"
   //                   value={searchTerm}
   //                   onChange={(e) => {
   //                      setSearchTerm(e.target.value);
   //                      setSelectedMarket(null);
   //                      setIsDropdownOpen(true);
   //                   }}
   //                   onFocus={() => setIsDropdownOpen(true)}
   //                   onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
   //                   className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
   //                />
   //                {/* Dropdown List */}
   //                {isDropdownOpen && filteredMarkets.length > 0 && (
   //                   <ul className="text-black absolute left-0 right-0 bg-white border border-[#f9e79f] max-h-40 overflow-y-auto mt-1 rounded-lg shadow-lg z-50">
   //                      {filteredMarkets.map((market) => (
   //                         <li
   //                            key={market._id}
   //                            className="p-2 hover:bg-yellow-100 cursor-pointer"
   //                            onMouseDown={(e) => {
   //                               e.preventDefault();
   //                               handleSelectMarket(market);
   //                            }}
   //                         >
   //                            {market.marketName}
   //                         </li>
   //                      ))}
   //                   </ul>
   //                )}
   //             </div>

   //             {/* Shop Name */}
   //             <input
   //                type="text"
   //                placeholder="Shop Name"
   //                value={shopName}
   //                onChange={(e) => setShopName(e.target.value)}
   //                className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
   //             />

   //             {/* Address Input */}
   //             <div className='relative space-y-3'>
   //                <input
   //                   type="text"
   //                   placeholder="Shop Address"
   //                   value={address}
   //                   onChange={(e) => {
   //                      setAddress(e.target.value);
   //                      setLocationFetched(false);
   //                   }}
   //                   className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
   //                />
   //                {locationFetched && (
   //                   <FaCheck className="absolute right-3 -top-0 text-yellow-600 text-lg" />
   //                )}
   //                <button type="button" onClick={getCoordinates} className="w-full py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition">
   //                   Fetch Location
   //                </button>
   //             </div>

   //             {/* Image Upload - Hidden when multiple images exist */}
   //             {images.length === 0 && (
   //                <div {...getRootProps()} className="w-full h-10 flex items-center justify-center border-2 border-dashed border-[#f9e79f] rounded-lg bg-white bg-opacity-40 text-yellow-800 cursor-pointer">
   //                   <input {...getInputProps()} />
   //                   <FaCamera className="text-yellow-500 text-2xl" />
   //                </div>
   //             )}

   //             {/* Selected Images Preview */}
   //             <div className="flex space-x-2 mt-2">
   //                {images.map((img, index) => (
   //                   <div key={index} className="relative">
   //                      <img src={img} alt={`Preview ${index}`} className="w-14 h-14 object-cover rounded-lg" />
   //                      <button
   //                         type="button"
   //                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm"
   //                         onClick={() => removeImage(index)}
   //                      >
   //                         ✖
   //                      </button>
   //                   </div>
   //                ))}
   //             </div>

   //             <button type="submit" className="w-full py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-300 shadow-lg">
   //                Register Shop
   //             </button>
   //          </form>
   //       </div>
   //    </div>
   // );

   return (
      <div className="flex flex-row items-center justify-evenly min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-200 p-10">
         {/* Logo Section */}
         <div className="flex flex-col items-center justify-center w-1/3 pr-10">
            <h1 className="text-6xl font-pixelify font-extrabold text-yellow-800 drop-shadow-md">AgriConnect</h1>
            <p className="text-lg text-yellow-800 text-center mt-4">Bridging Farmers & Buyers for a Sustainable Future</p>
         </div>
   
         {/* Registration Form */}
         <div className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl shadow-xl w-2/5 border border-[#f9e79f] mt-6">
            <h2 className="text-3xl font-bold text-center text-yellow-800 mb-4">Register Your Shop</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
               {/* Market Selection */}
               <div className="relative">
                  <input
                     type="text"
                     placeholder="Search Market"
                     value={searchTerm}
                     onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedMarket(null);
                        setIsDropdownOpen(true);
                     }}
                     onFocus={() => setIsDropdownOpen(true)}
                     onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                     className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
                  />
                  {isDropdownOpen && filteredMarkets.length > 0 && (
                     <ul className="text-black absolute left-0 right-0 bg-white border border-[#f9e79f] max-h-40 overflow-y-auto mt-1 rounded-lg shadow-lg z-50">
                        {filteredMarkets.map((market) => (
                           <li
                              key={market._id}
                              className="p-2 hover:bg-yellow-100 cursor-pointer"
                              onMouseDown={(e) => {
                                 e.preventDefault();
                                 handleSelectMarket(market);
                              }}
                           >
                              {market.marketName}
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
   
               {/* Shop Name */}
               <input
                  type="text"
                  placeholder="Shop Name"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
               />
   
               {/* Phone Number */}
               <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
               />

   
               {/* Address Input */}
               <div className='relative space-y-3'>
                  <input
                     type="text"
                     placeholder="Shop Address"
                     value={address}
                     onChange={(e) => {
                        setAddress(e.target.value);
                        setLocationFetched(false);
                     }}
                     className="w-full p-2 rounded-lg bg-white bg-opacity-40 text-yellow-800 border border-[#f9e79f] focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
                  />
                  {locationFetched && (
                     <FaCheck className="absolute right-3 -top-0 text-yellow-600 text-lg" />
                  )}
                  <button type="button" onClick={getCoordinates} className="w-full py-2 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600 transition">
                     Fetch Location
                  </button>
               </div>
   
               {/* Image Upload - Hidden when multiple images exist */}
               {images.length === 0 && (
                  <div {...getRootProps()} className="w-full h-10 flex items-center justify-center border-2 border-dashed border-[#f9e79f] rounded-lg bg-white bg-opacity-40 text-yellow-800 cursor-pointer">
                     <input {...getInputProps()} />
                     <FaCamera className="text-yellow-500 text-2xl" />
                  </div>
               )}
   
               {/* Selected Images Preview */}
               <div className="flex space-x-2 mt-2">
                  {images.map((img, index) => (
                     <div key={index} className="relative">
                        <img src={img} alt={`Preview ${index}`} className="w-14 h-14 object-cover rounded-lg" />
                        <button
                           type="button"
                           className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-sm"
                           onClick={() => removeImage(index)}
                        >
                           ✖
                        </button>
                     </div>
                  ))}
               </div>
   
               <button type="submit" className="w-full py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition duration-300 shadow-lg">
                  Register Shop
               </button>
            </form>
         </div>
      </div>
   );
   
};


export default ShopRegister;