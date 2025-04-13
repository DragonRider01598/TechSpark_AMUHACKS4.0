import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MdCalendarToday, MdClose, MdSearch } from "react-icons/md";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
};

const SearchProducts = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [uniqueMarkets, setUniqueMarkets] = useState([]);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: 28.7041, lng: 77.1025 }); // Default to Delhi
    const [markets, setMarkets] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [vendorData, setVendorData] = useState(null);



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${BACKEND_URL}/products`);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchMarkets = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/markets/`);
                const data = await response.json();
                setMarkets(data);
            } catch (error) {
                console.error("Error fetching markets:", error);
            }
        };

        fetchMarkets();
    }, []);

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

                setVendorData(updatedVendorData); // Store vendor and user details
            } catch (error) {
                console.error("Error fetching vendor details:", error);
            }
        };
        fetchVendorDetails();
    }, [products, selectedProduct]);

    // Function to calculate distance between two coordinates using Haversine formula
    const getDistance = (lat1, lng1, lat2, lng2) => {
        const toRad = (angle) => (angle * Math.PI) / 180;
        const R = 6371; // Radius of Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Function to fetch markets by product search
    const fetchMarketsByProduct = () => {
        if (!productName.trim()) {
            setFilteredProducts([]);
            setUniqueMarkets([]);
            return;
        }

        // Filter products matching the search query
        const matchedProducts = products.filter((product) =>
            product.name.toLowerCase().includes(productName.toLowerCase())
        );

        setFilteredProducts(matchedProducts);

        const marketSet = new Set();
        const uniqueMarketsData = matchedProducts
            .map((product) => product.marketId)
            .filter((marketId) => {
                if (!marketSet.has(marketId)) {
                    marketSet.add(marketId);
                    return true;
                }
                return false;
            })
            .map((marketId) => markets.find((market) => market._id === marketId))
            .filter((market) => market !== undefined); // Ensure valid market objects

        setUniqueMarkets(uniqueMarketsData);

        // Find the nearest market
        if (uniqueMarketsData.length > 0) {
            let nearestMarket = uniqueMarketsData.reduce((nearest, market) => {
                const distance = getDistance(
                    userLocation.lat, userLocation.lng,
                    market.location.latitude, market.location.longitude
                );

                return distance < nearest.distance
                    ? { market, distance }
                    : nearest;
            }, { market: uniqueMarketsData[0], distance: Infinity });

            setUserLocation({
                lat: nearestMarket.market.location.latitude,
                lng: nearestMarket.market.location.longitude,
            });
        }
    };




    return (
        <div className="flex w-full h-screen font-pixelify bg-[#bdf3f3bb] pt-16">
            {/* Sidebar */}
            <div className="w-1/3 p-6 bg-[#bdf3f3bb] text-black overflow-y-auto">
                <div className="flex flex-col space-y-5 justify-evenly mt-4">
                    <h2 className="text-2xl mx-auto font-bold text-[#057575bb]">Find By Products</h2>
                    <div className="relative w-[400px] mx-auto">
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="w-full p-3 ml-0 pr-10 rounded-full bg-gray-100 text-[#057575bb] focus:ring-2 focus:ring-[#97ececbb] outline-none font-[IBM Plex Mono]"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && fetchMarketsByProduct()}
                        />
                        <MdSearch
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#057575bb]-500 text-xl cursor-pointer"
                            onClick={fetchMarketsByProduct}
                        />
                    </div>
                </div>
                {error && <p className="text-[#057575bb] mt-2">{error}</p>}

                <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Matching Products:</h2>
            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                filteredProducts.map((product) => {
                    const market = markets.find((m) => m._id === product.marketId);
                    return (
                        <div
                            key={product._id}
                            onClick={() => setSelectedProduct(product)}
                            className="p-4 bg-[#7ac4c4bb] opacity-65 shadow-md rounded-lg border border-[#057575bb] cursor-pointer hover:shadow-xl transition-transform transform hover:scale-105"
                        >
                            {/* Row 1: Market Name and Price */}
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-black">
                                    {market ? market?.marketName : "Market Not Found"}
                                </h2>
                                <p className="text-lg font-semibold text-black">₹{product.price} {product.unit}</p>
                            </div>

                            {/* Row 2: Date Icon + Date and Stock */}
                            <div className="flex justify-between items-center mt-1">
                                <div className="flex items-center text-[#057575bb] text-med">
                                    <FaCalendarAlt className="text-black mr-1" />
                                    <span className="text-med text-black ">{new Date().toLocaleDateString()}</span>
                                </div>
                                <p className="text-lg font-semibold text-[#057575bb]">Stock: {product.stock}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>

            </div>

            {/* Map Section */}
            <div className="w-2/3 relative p-6 bg-[#bdf3f3bb] rounded-sm">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={userLocation}
                        options={mapOptions}
                    >
                        {uniqueMarkets.map((market) => (
                            <Marker
                                key={market._id}
                                position={{ lat: market.location.latitude, lng: market.location.longitude }}
                                icon={{
                                    url: "./market.png",
                                    scaledSize: new window.google.maps.Size(45, 35),
                                    anchor: new window.google.maps.Point(20, 35),
                                }}
                                label={{
                                    text: market.marketName,
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-50">
                    <div className="w-[500px] p-6 text-black rounded-lg relative flex items-center min-h-[255px] shadow-xl bg-cover bg-center">
                        {/* Overlay for readability */}
                        <div className="absolute inset-0 bg-white bg-opacity-55 rounded-lg"></div>

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
                                src={vendorData?.user?.profileImage ? `${BACKEND_URL}/${vendorData?.user?.profileImage}` : "./vendor_logo.png"}
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
                                    <span className="font-semibold mr-2">Days Open: </span> {"  " + vendorData?.daysOpen}
                                </p>
                                <p className="flex items-center">
                                    <FaPhoneAlt className="mr-3 text-[#165c58]" />
                                    {vendorData?.vendor?.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


};

export default SearchProducts;
