import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import useMarketStore from "../store/marketStore";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;
    const R = 6371; // Earth’s radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Distance in km
};

export default function MarketFinder() {
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [userLocation, setUserLocation] = useState({ lat: 19.2486925, lng: 72.8640593 }); // Default location
    const [filteredMarkets, setFilteredMarkets] = useState([]);
    const [error, setError] = useState("");
    const [markets, setMarkets] = useState([]);
    const navigate = useNavigate();
    const setMarketId = useMarketStore((state) => state.setMarketId);

    const handleMarketClick = useCallback((marketId) => {
        sessionStorage.setItem("marketId", marketId);
        setMarketId(marketId);
        navigate("/user-dashboard");
    }, [navigate, setMarketId]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => setUserLocation({ lat: coords.latitude, lng: coords.longitude }),
            () => console.error("Geolocation failed, using default location")
        );
    }, []);

    useEffect(() => {
        fetch(`${BACKEND_URL}/vendors/markets`)
            .then((res) => res.json())
            .then((data) => setMarkets(data))
            .catch((err) => console.error("Error fetching markets:", err));
    }, []);

    const getCoordinatesFromAddress = async (address) => {
        try {
            const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: { address, key: GOOGLE_MAPS_API_KEY },
            });
            if (!data.results.length) throw new Error("Invalid address");

            return data.results[0].geometry.location;
        } catch {
            throw new Error("Failed to fetch coordinates");
        }
    };

    const filterMarketsByDistance = useCallback((lat, lng, maxDistance = 5) => {
        let nearbyMarkets = markets.filter(
            (market) => haversineDistance(lat, lng, market.location.latitude, market.location.longitude) <= maxDistance
        );

        if (!nearbyMarkets.length) {
            nearbyMarkets = [markets.reduce((closest, market) => {
                const distance = haversineDistance(lat, lng, market.location.latitude, market.location.longitude);
                return !closest || distance < closest.distance ? { ...market, distance } : closest;
            }, null)];
        }

        setFilteredMarkets(nearbyMarkets);
    }, [markets]);

    const handleLocationFetch = async () => {
        if (!location.trim()) return setError("Please enter a location.");
        setError("");
        try {
            const coords = await getCoordinatesFromAddress(location);
            setCoordinates(coords);
            filterMarketsByDistance(coords.lat, coords.lng);
        } catch (err) {
            setError(err.message);
            setCoordinates(null);
        }
    };

    const mapOptions = useMemo(() => ({
        disableDefaultUI: true,
        zoomControl: true,
    }), []);

    return (
        <div className="flex w-full h-screen font-pixelify bg-[#dff1c8bb] pt-16 ">
            {/* Sidebar */}
            <div className="w-1/3 p-6 bg-[#dff1c8bb] text-black overflow-y-auto">
                {/* Location Search */}
                <div className="flex flex-col space-y-5 justify-evenly mt-4">
                    <h2 className="text-2xl mx-auto font-bold text-green-800">Nearby Farmers Markets</h2>
                    <div className="relative w-[400px] mx-auto">
                        <input
                            type="text"
                            placeholder="Enter a location to search markets"
                            className="w-full p-3 ml-0 pr-10 rounded-full bg-gray-100 text-black focus:ring-2 focus:ring-green-100 outline-none font-[IBM Plex Mono]"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleLocationFetch()}
                        />
                        <MdSearch
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                            onClick={handleLocationFetch}
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Market List */}

                <div className="mt-6 space-y-2 mx-auto">
                    {filteredMarkets.map((market) => {
                        // Format Date as "DD Month" using createdAt
                        const createdAtDate = new Date(market.createdAt);
                        const formattedDate = `${createdAtDate.getDate()} ${createdAtDate.toLocaleString('en-US', { month: 'short' })}`; // Example: "7 Mar"

                        return (
                            <div
                                key={market.id}
                                className="bg-[#fffef46f] opacity-85 p-3 rounded-2xl shadow-lg w-[340px] sm:w-[360px] md:w-[380px] flex flex-col relative z-10 font-['IBM Plex Mono'] cursor-pointer mx-auto"
                                onClick={() => handleMarketClick(market._id)}
                            >
                                {/* Row 1: Market Name (Left) | Calendar Icon (Right) */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-bold text-black">{market.marketName}</h2>
                                    <FaCalendarAlt className="text-gray-500 text-lg" />
                                </div>

                                {/* Row 2: Location (Left) | Date (Right) */}
                                <div className="flex justify-between items-center mt-1">
                                    <div className="flex items-center text-black text-sm">
                                        <FaMapMarkerAlt className="text-gray-500 text-sm mr-1" />
                                        {market.location.address}
                                    </div>
                                    <p className="text-lg font-semibold text-black">{formattedDate}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* Map Section */}
            <div className="w-2/3 relative p-6 bg-[#dff1c8bb] rounded-sm">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={14}
                        center={coordinates || userLocation}
                        options={mapOptions}
                    >
                        {filteredMarkets.map((market) => (
                            <Marker
                                key={market.id}
                                position={{ lat: market.location.latitude, lng: market.location.longitude }}
                                icon={{
                                    url: "./market.png",
                                    scaledSize: new window.google.maps.Size(45, 35),
                                    anchor: new window.google.maps.Point(20, 35),
                                    labelOrigin: new window.google.maps.Point(20, -10),
                                }}
                                label={{
                                    text: market.marketName,
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                }}
                                onClick={() => handleMarketClick(market._id)}
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}
