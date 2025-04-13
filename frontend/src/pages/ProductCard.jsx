import React from "react";
import "@fontsource/ibm-plex-mono";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const ProductCard = ({ image, name, price, unit, availability }) => {
  let avail;
  if (availability === "in stock") {
    avail = "In Stock"
  } else if (availability === "low stock") {
    avail = "Hurry! Only few left in Stock"
  } else {
    avail = "Oops! Out of Stock"
  }
  return (
  <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-md p-4 flex flex-col items-center w-48 h-64">
  {/* Product Image */}
  <img src={image ? `${BACKEND_URL}/${image[0]}` : null} alt={name} className="w-40 h-32 object-cover rounded-lg" />

  {/* Product Name */}
  <h2 className="text-lg font-[IBM Plex Mono] mt-2 text-black text-center">{name}</h2>

  {/* Price and Unit */}
  <p className="text-sm text-black font-[IBM Plex Mono] mt-1">₹{price} / {unit}</p>

  {/* Availability Status */}
  <p
    className={`text-xs font-semibold mt-1 ${
      avail === "In Stock"
        ? "text-green-600"
        : avail === "Hurry! Only few left in Stock"
        ? "text-[#87801f]"
        : "text-red-500"
    }`}
  >
    {avail}
  </p>
</div>

  );
};

export default ProductCard;
