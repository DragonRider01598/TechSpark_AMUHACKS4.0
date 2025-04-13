import React, { useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Location selection interface
// Allows users to choose and set their market location

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY  // Replace with your actual API key

const mapContainerStyle = {
    width: "50%",
    height: "500px",
    margin: "0 auto",
};

const defaultCenter = {
    lat: 19.2486925, // Default to New York
    lng: 72.8640593,
};

// Dummy shop data (near Dahisar East)
const dummyShops = [
    { id: 1, name: "Shop 1", latitude: 19.251909, longitude: 72.858179 },
    { id: 1, name: "Shop 2", latitude: 19.251809, longitude: 72.858379 },
    { id: 1, name: "Shop 3", latitude: 19.251609, longitude: 72.858579 },
];

function LocationFetcher() {
    const [location, setLocation] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState("");

    const getCoordinatesFromAddress = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: { address, key: GOOGLE_MAPS_API_KEY }
            });

            if (response.data.results.length === 0) throw new Error("Invalid address");

            const locationData = response.data.results[0].geometry.location;
            return { latitude: locationData.lat, longitude: locationData.lng };
        } catch (error) {
            throw new Error("Failed to fetch coordinates");
        }
    };

    const handleLocationFetch = async () => {
        if (!location.trim()) {
            setError("Please enter a location.");
            setCoordinates(null);
            return;
        }

        setError("");
        try {
            const coords = await getCoordinatesFromAddress(location);
            setCoordinates(coords);
        } catch (err) {
            setError(err.message);
            setCoordinates(null);
        }
    };

    return (
        <div className='text-center mt-5'>
            <h2>Find Coordinates and Display on Map</h2>

            <div className="relative z-50">
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter a location (e.g., Mumbai)"
                className="p-2 w-80 border border-gray-300 rounded-md text-lg"
            />

            <button
                onClick={handleLocationFetch}
                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 z-10"
            >
                Get Coordinates
            </button>
            </div>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            <div className="mt-5 flex justify-center">
                <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={coordinates ? 14 : 4}
                        center={coordinates ? { lat: coordinates.latitude, lng: coordinates.longitude } : defaultCenter}
                    >
                        {/* Marker for searched location */}
                        {coordinates && (
                            <Marker 
                                position={{ lat: coordinates.latitude, lng: coordinates.longitude }}
                                label="📍"
                            />
                        )}

                        {/* Dummy shop markers */}
                        {dummyShops.map((shop) => (
                            <Marker 
                                key={shop.id} 
                                position={{ lat: shop.latitude, lng: shop.longitude }} 
                                label="🏪"
                            />
                        ))}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );
}

export default LocationFetcher;
