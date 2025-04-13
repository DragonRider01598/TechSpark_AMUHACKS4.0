// import React from "react";
// import Navbar from "./NavBar";
// import Background from "./Background";
// import ProductCard from "./ProductCard";
// import LocationFetcher from "./Location";
// import { MdSearch } from "react-icons/md";
// import "@fontsource/ibm-plex-mono";

// const products = Array(8).fill({
//   id: 1,
//   name: "Fennel",
//   image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Fennel_Seeds.JPG",
// });

// const SearchBar = () => {
//   return (
//     <div className="flex justify-center mt-4">
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

// const UserDashboard = () => {
//   return (
//     <div className="relative min-h-[180vh] bg-white">
//       <Background />
//       <Navbar />
//       <SearchBar />

//       {/* Product Grid */}
//       <div className="relative flex justify-center mt-8">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {products.map((product, index) => (
//             <ProductCard key={index} image={product.image} name={product.name} />
//           ))}
//         </div>
//       </div>

//       {/* Footer Space */}
//       <div className="h-[250px]"></div>
//     </div>
//   );
// };

// export default UserDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import Background from "./Background";
import ProductCard from "./ProductCard";
import { MdSearch } from "react-icons/md";
import "@fontsource/ibm-plex-mono";

const products = [
  { id: 1, name: "Grapes", price: 120, image:"./product/grapes.png" },
  { id: 2, name: "Strawberry", price: 150, image: "./product/strawberry.png" },
  { id: 3, name: "Shevanti", price: 30, image: "./product/shevanti.png" },
  { id: 4, name: "Beetroot", price: 80, image: "product/beetroot.png" },
  { id: 5, name: "Jackfruit", price: 120, image:"product/jackfruit.png" },
  { id: 6, name: "Marigold", price: 20, image: "product/oraange_marigold.png" },
  { id: 7, name: "Zucchini", price: 90, image: "product/zucchini.png" },
];

const SearchBar = () => {
  return (
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
};

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate("/product", { state: { product } });
  };

  return (
    <div className="relative min-h-[180vh] bg-green">
      <Background />

      <Navbar />
      <SearchBar />
      {/* <LocationFetcher /> */}

      {/* Product Grid */}
      <div className="relative flex justify-center mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
              <ProductCard image={product.image} name={product.name} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Space */}
      <div className="h-[250px]"></div>
    </div>
  );
};

export default UserDashboard;
