import React from 'react';

// Card component for displaying individual product information
// Shows product image, name, price, and stock status
const ProductCard = ({ product, BACKEND_URL, openModal }) => {
  return (
    <div className="relative">
      <div
        className="bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col items-center w-[160px] sm:w-[180px] md:w-[200px] cursor-pointer"
        onClick={() => openModal(product)}
      >
        <img
          src={`${BACKEND_URL}/${product.images}`}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-full shadow-md"
        />
        <h2 className="text-lg font-semibold mt-2 text-yellow-900">
          {product.name}
        </h2>
        <p className="text-sm text-yellow-800 font-medium mt-1">
          ₹{product.price} / {product.unit}
        </p>
        <p
          className={`text-xs font-bold mt-1 ${
            product.stock === "in stock"
              ? "text-green-600"
              : product.stock === "low stock"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {product.stock.charAt(0).toUpperCase() + product.stock.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;