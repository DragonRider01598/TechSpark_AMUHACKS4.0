// Modal component for viewing and editing product details
// Handles product updates, stock management, and deletion

import React from 'react';

const ProductModal = ({
  isModalOpen,
  selectedProduct,
  selectedPrice,
  selectedStock,
  handlePriceChange,
  handleStockChange,
  handleDelete,
  closeModal,
  handleStockUpdate,
  BACKEND_URL,
  fetchProducts
}) => {
  if (!isModalOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-[#f7ffd6] opacity-85 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-2 text-black">{selectedProduct.name}</h2>
        <img
          src={`${BACKEND_URL}/${selectedProduct.images}`}
          alt={selectedProduct.name}
          className="w-32 h-32 object-cover mx-auto rounded-md mb-3"
        />

        <div className="flex flex-col space-y-3 mb-3">
          <p className="text-gray-700">Current Price: ₹{selectedProduct.price} / {selectedProduct.unit}</p>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={selectedPrice ?? selectedProduct.price}
            onChange={handlePriceChange}
            onWheel={(e) => e.target.blur()} // Prevent scroll from changing value
            className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
          />
          <p className="text-gray-700 mb-2">Current Stock: {selectedProduct.stock}</p>
          <select
            value={selectedStock}
            onChange={handleStockChange}
            className="w-full p-2 border rounded-md mb-3 bg-yellow-100 text-black"
          >
            <option value="in stock">In Stock</option>
            <option value="low stock">Low Stock</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="bg-red-500 px-4 py-2 rounded-md text-white"
          >
            Delete
          </button>

          <div className="flex space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-400 px-4 py-2 rounded-md text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleStockUpdate}
              className="bg-yellow-500 px-4 py-2 rounded-md text-white"
            >
              Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;