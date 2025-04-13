import React, { useEffect, useState } from 'react';
import { FaMicrophone } from "react-icons/fa";
import { getProductImage } from '../utils/productImageMap';

const AddProductForm = ({
  newProduct,
  setNewProduct,
  addProduct,
  handleSpeechInput,
  categories,
  fetchProducts,
  transcript
}) => {

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (newProduct.name && !newProduct.images) {
      const mappedImage = getProductImage(newProduct.name);
      setNewProduct(prev => ({
        ...prev,
        mappedImage // Store the mapped image path
      }));
    }
  }, [newProduct.name]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct(prev => ({
        ...prev,
        images: file,
        mappedImage: null // Clear mapped image when user uploads
      }));
    }
  };

  const handleSpeechButtonClick = () => {
    setIsListening(true);
    handleSpeechInput(setNewProduct, newProduct, () => {
      setIsListening(false);
    });
  }

  return (
    <div className="bg-white/30 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-lg border border-[#f9e79f] mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-900">Add a Product</h2>

      {transcript && (
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg text-yellow-900">
          <p className="text-center font-medium">Recognized: "{transcript}"</p>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <button
          onClick={handleSpeechButtonClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition duration-300 ${isListening
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-yellow-600 text-white hover:bg-yellow-700'
            }`}
        >
          <FaMicrophone /> {isListening ? 'Listening...' : 'Speak'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
        />

        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
        />

        <select
          value={newProduct.unit}
          onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
          className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
        >
          <option value="kg">Kg</option>
          <option value="Liter">Liter</option>
          <option value="Dozen">Dozen</option>
        </select>

        <select
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
        >
          <option value="in stock">In Stock</option>
          <option value="low stock">Low Stock</option>
          <option value="out of stock">Out of Stock</option>
        </select>

        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-yellow-900 mb-2">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="p-2 border rounded-lg w-full bg-white/40 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-[#f9e79f] backdrop-blur-md"
          />

          {newProduct.mappedImage && !newProduct.images && (
            <div className="mt-2">
              <p className="text-sm text-yellow-700">
                Default image will be used: {newProduct.name}
              </p>
              <img
                src={newProduct.mappedImage}
                alt="Default product"
                className="w-20 h-20 object-cover mt-2 rounded-lg"
              />
            </div>
          )}
        </div>

      </div>

      <button
        onClick={() => addProduct(newProduct)}
        className="mt-4 px-4 py-2 bg-yellow-500 text-white font-bold rounded-lg w-full hover:bg-yellow-600 transition duration-300 shadow-md"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;