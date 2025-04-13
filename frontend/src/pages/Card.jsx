import React from "react";
import { FaStar } from "react-icons/fa";
import { PiCurrencyInrBold } from "react-icons/pi"; 
import "@fontsource/ibm-plex-mono"; 

const Card = ({ image, title, source, vendor, price, rating }) => {
  return (
    <div className="bg-[#fffef46f] opacity-85 p-3 rounded-2xl shadow-lg w-[360px] sm:w-[400px] md:w-[420px] flex items-center relative z-10 font-['IBM Plex Mono']">
      
      <div className="relative z-20 flex flex-col items-center">
        <img src={image} alt={title} className="w-20 h-20 object-cover rounded-lg shadow-md" />
        <div className="flex items-center mt-[2px]">
          <FaStar className="text-yellow-500 text-xs" />
          <span className="text-black font-bold text-xs ml-1">{rating || "4.8"}</span>
        </div>
      </div>

      
      <div className="h-full w-[1.5px] border-dotted border-r border-gray-400 mx-2"></div>

      
      <div className="flex-1 relative z-10">
      
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="text-base font-bold text-black flex items-center">
            <PiCurrencyInrBold className="text-xl mr-1" />
            {price} per kg
          </p>
        </div>

        
        <div className="flex justify-between items-center mt-[2px]">
          <p className="text-gray-600 text-xs">Source</p>
          <p className="text-black text-xs">{source}</p>
        </div>

       
        <div className="flex justify-between items-center mt-[2px]">
          <p className="text-gray-600 text-xs">Vendor</p>
          <p className="text-black font-semibold text-xs">{vendor}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
