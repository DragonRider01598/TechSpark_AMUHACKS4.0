import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import DashboardImage from "../assets/dashboard.png";
import { useRef } from "react";
import Farmer from "../assets/farmer.png";
import Background_main from "./Background_main";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import vendorStore from "../store/vendorStore";
import { useAuthStore } from "../store/useAuthStore";
import { FaMapMarkerAlt, FaSearch, FaStore } from "react-icons/fa";
import toast from 'react-hot-toast';

const FAQ = () => {
    const navigate = useNavigate();
    const sectionVariants = {
        hidden: { opacity: 0, y: 70 },
        visible: { opacity: 1, y: 0, transition: { duration: 2.5 } }
    };

    const { authUser, authenticateUser } = useAuthStore();
    const { fetchVendors, vendors, setVendorId } = vendorStore();

    useEffect( () => {
        const fetchAuth = async () => {
            await authenticateUser();
        };
        fetchAuth();
        fetchVendors();
    }, [fetchVendors, authUser.userId]);

    const currentUser = authUser.userId;

    const handleVendorClick = () => {
        // Find if the current user is a registered vendor
        const matchedVendor = vendors.find(vendor => vendor.userId === currentUser);

        if (matchedVendor) {
            sessionStorage.setItem("vendorId", matchedVendor._id);
            navigate("/vendor-dashboard");
        } else {
            navigate("/shopreg");
        }
    };

    const handleProductClick = () => {
        navigate("/search-product");
    };

    useEffect(() => {
        if (!localStorage.getItem("hasSeenOptMarkets")) {
            toast.success("Malad Main Market: The ultimate hotspot for the latest trends, fresh finds, and unbeatable deals! 🔥🛍️", {
                duration: 5000,
                position: "top-center",
            });
            localStorage.setItem("hasSeenOptMarkets", "true");
        }
    }, []);

    const nextSectionRef = useRef(null);


    const handleVideoEnd = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <>
            <div>
                <div className="w-screen h-screen flex justify-center items-cente">
                    <video className="w-full h-full object-cover"
                        autoPlay
                        loop={false} // Ensure it plays only once
                        muted
                        onEnded={handleVideoEnd}>
                        <source src="./AgroCo_v.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div ref={nextSectionRef} className="m-2.5 font-pixelify ">
                    <div className="min-h-screen p-8">
                        <div className="flex flex-col-2 justify-center items-center gap-12">
                            <div>
                                <Background_main />
                                <div className="flex flex-col items-center justify-center text-center">
                                    <h1 className="text-5xl font-bold text-[#165c58] m-2.5">
                                        AgriConnect
                                    </h1>
                                    <p className="text-xl italic text-[#1e5c59] m-2.5">Bridging Farmers to Markets, Freshness to You!</p>
                                    <p className="py-6 max-w-lg text-[#0b312f] text-lg leading-relaxed m-2.5">
                                        Farmers and consumers are the backbone of a sustainable future. Our platform bridges the gap by providing easy access to fresh, locally sourced produce, ensuring a healthier lifestyle while supporting local farming communities.
                                    </p>

                                </div>

                                <div className="flex flex-wrap gap-x-10 items-center justify-evenly pt-4 m-2.5">
                                    {/* Explore Markets Button */}
                                    <div className="w-full sm:w-auto cursor-pointer">
                                        <Link
                                            to="/search"
                                            className="flex flex-col justify-center items-center w-28 h-28 bg-[#137b4ba1] backdrop-blur-lg 
                                        border border-white/30 text-sm text-[#cbe8e7] shadow-md rounded-full transition duration-300 
                                        hover:bg-black hover:shadow-lg"
                                        >
                                            <FaMapMarkerAlt size={28} className="mb-1 text-[#cbe8e7]" />
                                            <span className="font-medium">Markets</span>
                                        </Link>
                                    </div>

                                    {/* Find Products Button */}
                                    <div className="w-full md:w-auto cursor-pointer">
                                        <div
                                            onClick={handleProductClick}
                                            className="flex flex-col justify-center items-center  w-28 h-28 bg-[#28b7b0c9] backdrop-blur-lg 
                                        border border-white/30 text-sm text-[#cbe8e7] shadow-md rounded-full transition duration-300 
                                        hover:bg-black hover:shadow-lg"
                                        >
                                            <FaSearch size={28} className="mb-1 text-[#cbe8e7]" />
                                            <span className="font-medium">Products</span>
                                        </div>
                                    </div>

                                    {/* Sell Products Button */}
                                    <div className="w-full md:w-auto cursor-pointer">
                                        <div
                                            onClick={handleVendorClick}
                                            className="flex flex-col justify-center items-center  w-28 h-28 bg-[#bbbf33dc] backdrop-blur-lg 
                                        border border-white/30 text-sm text-[#cbe8e7] shadow-md rounded-full transition duration-300 
                                        hover:bg-black hover:shadow-lg"
                                        >
                                            <FaStore size={28} className="mb-1 text-[#cbe8e7]" />
                                            <span className="font-medium">Sell</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="w-1/2 m-2.5">
                                <img
                                    src={DashboardImage}
                                    className="w-full p-8" />
                            </div>
                        </div>
                    </div>




                    <div>
                        <motion.section
                            className="py-16 relative m-2.5"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                        >
                            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                                <motion.div
                                    className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1"
                                    variants={sectionVariants}
                                >
                                    {/* Image Grid */}
                                    <motion.div
                                        className="w-full justify-center items-start gap-6 grid sm:grid-cols-1 lg:order-first order-last"
                                        variants={sectionVariants}
                                    >
                                        {/* Left Column - Animated Image with Increased Size & Left Margin */}
                                        <motion.div
                                            className="pt-15 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex ml-10"
                                            initial={{ opacity: 0, y: 100 }} // Starts lower
                                            whileInView={{ opacity: 1, y: 0 }} // Moves up smoothly
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                        >
                                            <img
                                                className="rounded-xl object-cover m-2.5 w-150"
                                                src={Farmer}
                                                alt="About Us image"
                                            />
                                        </motion.div>
                                    </motion.div>

                                    {/* Text Content */}
                                    <motion.div
                                        className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex m-2.5"
                                        variants={sectionVariants}
                                    >
                                        <div className="w-full flex-col justify-center items-start gap-8 flex">
                                            <motion.div
                                                className="w-full flex-col justify-start lg:items-start items-center gap-3 flex"
                                                variants={sectionVariants}
                                            >

                                                <h2 className="text-[#165c58] text-4xl font-bold font-manrope leading-normal lg:text-start text-center m-2.5">
                                                    Connecting Farmers & Locals for a Healthy Future of India
                                                </h2>
                                                <p className="text-[#0b312f] text-base font-normal leading-relaxed lg:text-start text-center m-2.5">
                                                    Consumers often struggle to locate nearby farmers' markets and access information about available produce, pricing, and vendor details.
                                                    This platform helps connect consumers with local farmers' markets, track product availability, and support sustainable consumption.                                                </p>

                                            </motion.div>

                                            {/* Statistics Section */}
                                            <motion.div
                                                className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex m-2.5"
                                                variants={sectionVariants}
                                            >
                                                <motion.div className="flex-col justify-start items-start inline-flex m-2.5">
                                                    <h3 className="text-[#165c58] text-4xl font-bold font-manrope leading-normal">100+</h3>
                                                    <h6 className="text-[#165c58] text-base font-normal leading-relaxed">Markets Connected</h6>
                                                </motion.div>
                                                <motion.div className="flex-col justify-start items-start inline-flex m-2.5">
                                                    <h4 className="text-[#165c58] text-4xl font-bold font-manrope leading-normal">101+</h4>
                                                    <h6 className="text-[#165c58] text-base font-normal leading-relaxed">Products Listed</h6>
                                                </motion.div>
                                                <motion.div className="flex-col justify-start items-start inline-flex m-2.5">
                                                    <h4 className="text-[#165c58] text-4xl font-bold font-manrope leading-normal">10K+</h4>
                                                    <h6 className="text-[#165c58] text-base font-normal leading-relaxed">Happy Consumers</h6>
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;
