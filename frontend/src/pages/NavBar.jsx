import { MdShoppingCart, MdFavorite, MdAccountCircle, MdStorefront } from "react-icons/md";
import "@fontsource/pixelify-sans/400.css"; // Ensure correct font import
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore'
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// Main navigation component
// Provides site-wide navigation and user menu
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [hue, setHue] = useState("green")


  const navigate = useNavigate();
  const location = useLocation();

  const { authUser, authenticateUser } = useAuthStore();
  useEffect(() => {
    const fetchAuth = async () => {
      await authenticateUser();
    };
    fetchAuth();
    console.log(authUser)
  }, [location.pathname])

  useEffect(() => {
    const blue = ["/search-product"];
    const yellow = ["/vendor-dashboard", "/shopreg"];

    if (blue.includes(location.pathname)) {
      setHue("blue");
    } else if (yellow.includes(location.pathname)) {
      setHue("yellow");
    } else {
      setHue("green");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    // Clear stored vendorId and other session data
    sessionStorage.removeItem("vendorId");
    sessionStorage.clear(); 

    // Call backend to logout
    await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "DELETE",
      credentials: 'include',
    });

    // Redirect to login page or home
    toast.success("Logged out successfully")
    navigate('/'); 
    window.location.reload(); // Only if necessary
};


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (   
<nav className="fixed top-0 left-0 w-full font-pixelify-sans bg-white bg-opacity-90 backdrop-blur-lg px-6 py-4 flex justify-between items-center shadow-md z-50 h-16">
<div className="flex items-center space-x-8 font-pixelify">
        <Link to="/" className={`text-${hue}-800 text-2xl font-bold `}>AgriConnect</Link>
      </div>

      {(location.pathname === "/login" || location.pathname === "/register") ? (
        <div className="flex items-center space-x-4">
          {/* User Dropdown */}
          <div className="relative">
            <button
              className={`flex items-center px-4 py-2 bg-${hue}-100 text-black rounded-full hover:bg-${hue}-200`}
              onClick={() => {
                navigate('/')
              }}
            >
              {"Back to Home"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">

          {/* User Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button
              className={`flex items-center px-4 py-2 bg-${hue}-100 text-black rounded-full hover:bg-${hue}-200`}
              onClick={() => {
                if (authUser?.username) {
                  setIsUserDropdownOpen((prev) => !prev)
                } else {
                  navigate('/login')
                }
              }}
            >
              {authUser?.profileImage ? (
                <img
                  src={`${BACKEND_URL}/${authUser.profileImage}`}
                  className="w-8 h-8 rounded-full mr-2"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop in case fallback also fails
                    e.target.src = ""; // Set empty src so the image disappears
                    e.target.replaceWith(<MdAccountCircle className="mr-2 text-xl text-black" />);
                  }}
                />
              ) : (
                <MdAccountCircle className="mr-2 text-xl text-black" />
              )}
              {authUser?.username ? authUser.username : "Login"}
            </button>
            {isUserDropdownOpen && authUser?.username && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
