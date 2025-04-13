// import React from "react";
// import { useLocation } from "react-router-dom";
// import Card from "./Card";
// import Background from "./Background";
// import Navbar from "./NavBar";
// import { MdSearch } from "react-icons/md";
// import "@fontsource/ibm-plex-mono";


// const SearchBar = () => {
//   return (
//     <div className="flex justify-center mt-28"> 
//       <div className="relative w-[400px]">
//         <input
//           type="text"
//           placeholder="Search for any fresh farm products!"
//           className="w-full p-3 pl-4 pr-10 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-green-400 outline-none font-[IBM Plex Mono]"
//         />
//         <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// const ProductInMarket = () => {
//   const location = useLocation();
//   const { product } = location.state || {}; // Get product data from navigation

//   // Sample 10 product list (if no product is passed)
//   const products = [
//     { id: 1, name: "Apples", price: 120, image: "./vendor_fruits/apple.png", vendor: "Mr. Dixit", source: "Nashik", rating: 4.7 },
//     { id: 2, name: "Egg", price: 60, image: "./vendor_fruits/egg.png", vendor: "Mr. Jadhav", source: "Pune", rating: 4.5 },
//     { id: 3, name: "Gajra", price: 90, image: "./vendor_fruits/gajra.png", vendor: "Mr. Shinde", source: "Solapur", rating: 4.3 },
//     { id: 4, name: "Ghee", price: 150, image: "./vendor_fruits/ghee.png", vendor: "Mr. Patil", source: "Kolhapur", rating: 4.8 },
//     { id: 5, name: "Grapes", price: 200, image: "./vendor_fruits/grapes.png", vendor: "Mr. More", source: "Sangli", rating: 4.6 },
//     { id: 6, name: "Jackfruit", price: 180, image: "./vendor_fruits/jackfruit.png", vendor: "Mr. Kale", source: "Ratnagiri", rating: 4.4 },
//     { id: 7, name: "Mango", price: 250, image: "./vendor_fruits/mango.png", vendor: "Mr. Sawant", source: "Sindhudurg", rating: 4.9 },
//     { id: 8, name: "Mango 1", price: 300, image: "./vendor_fruits/mango1.png", vendor: "Mr. Chavan", source: "Satara", rating: 4.8 },
//     { id: 9, name: "Onion", price: 220, image: "./vendor_fruits/onion.png", vendor: "Mr. Pawar", source: "Jalgaon", rating: 4.5 },
//     { id: 10, name: "Roses", price: 280, image: "./vendor_fruits/roses.png", vendor: "Mr. Deshmukh", source: "Ahmednagar", rating: 4.7 },
//     { id: 11, name: "Spices", price: 260, image: "./vendor_fruits/spices.png", vendor: "Mr. Gaikwad", source: "Belgaum", rating: 4.6 },
//     { id: 12, name: "Spring", price: 180, image: "./vendor_fruits/spring.png", vendor: "Mr. Lonkar", source: "Aurangabad", rating: 4.4 },
//   ];  
  
//   return (
//     <div className="relative min-h-[180vh] pb-16">
//     <Background />
//       <Navbar />
//       <SearchBar />

//       <div className="relative flex justify-center mt-8 z-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-8">
//       {products.map((item) => (
//             <Card
//               key={item.id}
//               image={item.image}
//               title={item.name}
//               source={item.source}
//               price={item.price}
//               vendor={item.vendor}
//               rating="4.8"
//             />
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ProductInMarket;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "./Card";
import Background from "./Background";
import Navbar from "./NavBar";
import { MdSearch, MdClose } from "react-icons/md"; // Fixed: Import MdClose
import { FaMapMarkerAlt, FaRegClock, FaPhoneAlt } from "react-icons/fa"; // Icons
import "@fontsource/ibm-plex-mono";

const SearchBar = () => (
  <div className="flex justify-center mt-28">
    <div className="relative w-[400px]">
      <input
        type="text"
        placeholder="Search for any fresh farm products!"
        className="w-full p-3 pl-4 pr-10 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-green-400 outline-none font-[IBM Plex Mono]"
      />
      <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
    </div>
  </div>
);

const ProductInMarket = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Get product data from navigation

  const [selectedProduct, setSelectedProduct] = useState(null); // Modal state

  const products = [
    { id: 1, name: "Apples", price: 120, image: "./vendor_fruits/apple.png", vendor: "Mr. Dixit", source: "Nashik", rating: 4.7 },
    { id: 2, name: "Egg", price: 60, image: "./vendor_fruits/egg.png", vendor: "Mr. Jadhav", source: "Pune", rating: 4.5 },
    { id: 3, name: "Gajra", price: 90, image: "./vendor_fruits/gajra.png", vendor: "Mr. Shinde", source: "Solapur", rating: 4.3 },
    { id: 4, name: "Ghee", price: 150, image: "./vendor_fruits/ghee.png", vendor: "Mr. Patil", source: "Kolhapur", rating: 4.8 },
    { id: 5, name: "Grapes", price: 200, image: "./vendor_fruits/grapes.png", vendor: "Mr. More", source: "Sangli", rating: 4.6 },
    { id: 6, name: "Jackfruit", price: 180, image: "./vendor_fruits/jackfruit.png", vendor: "Mr. Kale", source: "Ratnagiri", rating: 4.4 },
    { id: 7, name: "Mango", price: 250, image: "./vendor_fruits/mango.png", vendor: "Mr. Sawant", source: "Sindhudurg", rating: 4.9 },
    { id: 8, name: "Mango 1", price: 300, image: "./vendor_fruits/mango1.png", vendor: "Mr. Chavan", source: "Satara", rating: 4.8 },
    { id: 9, name: "Onion", price: 220, image: "./vendor_fruits/onion.png", vendor: "Mr. Pawar", source: "Jalgaon", rating: 4.5 },
    { id: 10, name: "Roses", price: 280, image: "./vendor_fruits/roses.png", vendor: "Mr. Deshmukh", source: "Ahmednagar", rating: 4.7 },
    { id: 11, name: "Spices", price: 260, image: "./vendor_fruits/spices.png", vendor: "Mr. Gaikwad", source: "Belgaum", rating: 4.6 },
    { id: 12, name: "Spring", price: 180, image: "./vendor_fruits/spring.png", vendor: "Mr. Lonkar", source: "Aurangabad", rating: 4.4 },
  ];  

  return (
    <div className="relative min-h-[180vh] pb-16">
      <Background />
      <SearchBar />

      <div className="relative flex justify-center mt-8 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center mt-8">
          {products.map((item) => (
            <div key={item.id} onClick={() => setSelectedProduct(item)} className="cursor-pointer">
              <Card
                image={item.image}
                title={item.name}
                source={item.source}
                price={item.price}
                vendor={item.vendor}
                rating={item.rating}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-[500px] p-4 bg-[#f0efde] bg-opacity-95 text-black rounded-lg relative flex items-center min-h-[250px]">
      
      {/* Close Button */}
      <button
        className="absolute top-2 right-3 text-2xl text-black hover:text-red-500"
        onClick={() => setSelectedProduct(null)}
      >
        <MdClose />
      </button>

      {/* Left Side - Vendor Image & Name */}
      <div className="flex flex-col items-center w-1/3">
        <img
          src={selectedProduct.image || "./default_vendor.png"}  // Fallback Image
          alt={selectedProduct.vendor}
          className="w-24 h-24 object-cover rounded-full border border-gray-400 shadow-md"
        />
        <h3 className="mt-2 font-bold text-lg">{selectedProduct.vendor}</h3>
        <p className="text-sm flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-1" /> {selectedProduct.source}
        </p>
      </div>

      {/* Right Side - Message & Details */}
      <div className="ml-6 border-l-2 border-gray-600 pl-4 flex-1">
        {/* Additional Details */}
        <div className="mt-2 text-black font-mono text-sm space-y-1">
          <p><span className="font-bold">Store Location:</span> {selectedProduct.source}</p>
          <p><span className="font-bold">Time:</span> {selectedProduct.time}</p>
          <p><span className="font-bold">Days Open:</span> {selectedProduct.daysOpen}</p>
          <p className="flex items-center">
            <FaPhoneAlt className="mr-2 text-lg" />
            <span>{selectedProduct.contact}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductInMarket;
