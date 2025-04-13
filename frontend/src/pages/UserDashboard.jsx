import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "./Background";
import ProductCard from "./ProductCard";
import { MdClose, MdAttachMoney, MdSearch, MdAccessTime, MdCalendarToday } from "react-icons/md";
import { FaMapMarkerAlt, FaRegClock, FaPhoneAlt } from "react-icons/fa"; // Icons
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const SearchBar = ({ searchQuery, setSearchQuery, categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex justify-center mt-6 space-x-4">
      <div className="relative w-[300px]">
        <input
          type="text"
          placeholder="Search for any fresh farm products!"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-4 pr-10 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-green-400 outline-none"
        />
        <MdSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
      </div>
      <select
        className="p-3 px-4 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-green-400 outline-none"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const [marketId, setMarketId] = useState(null);
  const [marketData, setMarketData] = useState({ "marketName": "Local Farmers Market" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.price - b.price);
        setProducts(sortedData);
        setCategories([...new Set(data.map(product => product.category))]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedMarketId = sessionStorage.getItem("marketId");
    if (savedMarketId) {
      setMarketId(savedMarketId);
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          (!marketId || product.marketId === marketId) &&
          (!selectedCategory || product.category === selectedCategory) &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [marketId, products, selectedCategory, searchQuery]);

  useEffect(() => {
    if (marketId) {
      setFilteredProducts(products.filter((product) =>
        (!marketId || product.marketId === marketId) &&
        (!selectedCategory || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }
    const fetchMarket = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/markets`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const newData = data.filter((market) =>
          market._id === sessionStorage.getItem("marketId")
        ).map(market => {
          const date = new Date(market.createdAt);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          });

          return {
            ...market,
            formattedDate
          };
        });

        setMarketData(newData[0]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchMarket();
  }, [marketId, products]);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      if (!selectedProduct) return; // Ensure a product is selected

      try {
        const response = await fetch(`${BACKEND_URL}/markets/id/${selectedProduct._id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch vendor details");
        }
        const data = await response.json();
        const updatedVendorData = {
          ...data,
          daysOpen: 3,
        };
        console.log(updatedVendorData)

        setVendorData(updatedVendorData); // Store vendor and user details
      } catch (error) {
        console.error("Error fetching vendor details:", error);
      }
    };
    fetchVendorDetails();
  }, [marketId, products, selectedProduct]); // Ensure `selectedProductId` is a dependency  

  return (
    <div className="relative min-h-[100vh] pt-20">
      <Background />
      <div className="flex flex-col items-center justify-center text-center mt-12">
        {/* Market Name */}
        <h1 className="text-4xl font-bold text-[#165c58] font-[Pixelify Sans]">
          {marketData.marketName}
        </h1>

        {/* Date & Time */}
        <p className="text-lg text-gray-700 mt-2">
          {marketData.formattedDate} | 8:00 AM - 6:00 PM
        </p>
      </div>

      <SearchBar searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory} />

      {/* Product Grid */}
      <div className="relative flex justify-center mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  console.log(product)
                  setSelectedProduct(product)
                }}
                className="cursor-pointer"
              >
                <ProductCard
                  image={product?.images}
                  name={product.name}
                  price={product.price}
                  unit={product.unit}
                  availability={product.stock}
                />
              </div>
            ))
          ) : (
            <p className="col-span-4 text-center text-gray-500">
              No products found
            </p>
          )}
        </div>
      </div>
      {/* Search Bar */}



      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-50">
          <div
            className="w-[500px] p-6 text-black rounded-lg relative flex items-center min-h-[255px] shadow-xl bg-cover bg-center"    >
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-3xl text-black hover:text-red-500 z-10"
              onClick={() => setSelectedProduct(null)}
            >
              <MdClose />
            </button>

            {/* Left Side - Vendor Image & Name */}
            <div className="flex flex-col items-center w-1/3 z-10 space-y-3">
              <img
                src={vendorData?.user?.profileImage ? `${BACKEND_URL}/${vendorData?.user?.profileImage}` : "./vendor_logo.png"} // Fallback Image
                alt={vendorData?.user?.name}
                className="w-28 h-28 object-cover rounded-full border border-gray-500 shadow-lg"
              />
              <h1 className="mx-auto font-bold text-xl text-[#385c16]">
                {vendorData?.user?.name}
              </h1>
            </div>

            {/* Right Side - Product Details */}
            <div className="ml-6 border-l-2 border-gray-600 pl-5 space-y-1 flex-1 z-10">
              <h2 className="text-2xl font-bold text-[#165c58] flex items-center mt-1">{selectedProduct.name}</h2>

              {/* Price */}
              <p className="text-xl font-bold text-[#165c58] flex items-center mt-1">
                ₹{selectedProduct.price} / {selectedProduct.unit}
              </p>

              {/* Additional Details */}
              <div className="mt-4 text-black font-mono text-lg space-y-2">
                <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-3 text-[#165c58]" />
                  {vendorData?.vendor?.location?.address}
                </p>
                <p className="flex items-center">
                  <MdCalendarToday className="mr-3 text-[#165c58]" />
                  <span className="font-semibold">Days Open:</span> {vendorData?.daysOpen}
                </p>
                <p className="flex items-center">
                  <FaPhoneAlt className="mr-3 text-[#165c58]" />
                  <span className="font-semibold">Contact:</span> {vendorData?.vendor?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-[250px]"></div>
    </div>
  );
};

export default UserDashboard;
