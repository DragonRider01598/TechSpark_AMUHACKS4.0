import React from 'react';
import { FaPlus, FaBox, FaTable } from "react-icons/fa";

// Navigation component for vendor dashboard
// Handles switching between different views (products, stats, etc.)
const DashboardNav = ({ view, setView }) => {
  return (
    <div className="flex gap-6 mb-8">
      <button
        onClick={() => setView("products")}
        className={`flex flex-col justify-center items-center w-28 h-28 bg-white/30 backdrop-blur-lg border border-[#f9e79f] 
              text-yellow-900 shadow-md rounded-xl transition duration-300 
              ${view === "products" ? "bg-yellow-500 text-white shadow-lg" : "hover:bg-black hover:text-white hover:shadow-lg"}`}
      >
        <FaBox className="text-2xl mb-2" />
        My Grown Products
      </button>

      <button
        onClick={() => setView("addProduct")}
        className={`flex flex-col justify-center items-center w-28 h-28 bg-white/30 backdrop-blur-lg border border-[#f9e79f] 
          text-yellow-900 shadow-md rounded-xl transition duration-300 
          ${view === "addProduct" ? "bg-yellow-500 text-white shadow-lg" : "hover:bg-black hover:text-white hover:shadow-lg"}`}
      >
        <FaPlus className="text-2xl mb-2" />
        Add New Product
      </button>

      <button
        onClick={() => setView("tableView")}
        className={`flex flex-col justify-center items-center w-28 h-28 bg-white/30 backdrop-blur-lg border border-[#f9e79f] 
              text-yellow-900 shadow-md rounded-xl transition duration-300 
              ${view === "tableView" ? "bg-yellow-500 text-white shadow-lg" : "hover:bg-black hover:text-white hover:shadow-lg"}`}
      >
        <FaTable className="text-2xl mb-2" />
        View as Table
      </button>

      <button
        onClick={() => setView("dashView")}
        className={`flex flex-col justify-center items-center w-28 h-28 bg-white/30 backdrop-blur-lg border border-[#f9e79f] 
              text-yellow-900 shadow-md rounded-xl transition duration-300 
              ${view === "dashView" ? "bg-yellow-500 text-white shadow-lg" : "hover:bg-black hover:text-white hover:shadow-lg"}`}
      >
        <FaTable className="text-2xl mb-2" />
        Dashboard
      </button>
    </div>
  );
};

export default DashboardNav;