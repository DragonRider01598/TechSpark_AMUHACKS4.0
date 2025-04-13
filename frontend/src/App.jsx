import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import UserDashboard from './pages/UserDashboard'
// import Menu from './pages/Menu'
// import FAQ from './pages/FAQ'
// import Contact from './pages/Contact'
import VendorDashboard from './pages/VendorDashboard'
import { Routes, Route, Navigate } from 'react-router-dom';
import FAQ from './pages/FAQ'
import Navbar from './pages/NavBar'
import ProductInMarket from './pages/ProductInMarket'
import Register from './pages/Register'
import Login from './pages/Login'
import { useAuthStore } from './store/useAuthStore.js'
import ShopRegister from './pages/ShopRegister.jsx'
import { useLocation } from "react-router-dom";
import SearchProducts from './pages/SearchProducts.jsx'
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, authenticateUser } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticateUser().finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  const HiddenRoute = ({ element }) => {
    return authUser?.isLogged ? <Navigate to="/" replace /> : element;
  };

  const LoggedRoute = ({ element }) => {
    return authUser?.isLogged ? element : <Navigate to="/login" replace />;
  };

  


  return (
    <>
      <Navbar />
      {/* <Navbar/> */}
      <Routes>
        <Route path="/search" element={<LoggedRoute element={<Dashboard />} />} />
        <Route path="/" element={<FAQ />} />
        <Route path="/user-dashboard" element={<LoggedRoute element={<UserDashboard />} />} />
        {/* <Route path="/map-location" element={<LoggedRoute element={<MapLocation />} />} /> */}
        <Route path="/vendor-dashboard" element={<LoggedRoute element={<VendorDashboard />} />} />
        <Route path="/search-product" element={<LoggedRoute element={<SearchProducts />} />} />
        {/* <Route path="/product" element={<LoggedRoute element={<ProductInMarket />} />} /> */}


        <Route path="/register" element={<HiddenRoute element={<Register />} />} />
        <Route path="/login" element={<HiddenRoute element={<Login />} />} />
        <Route path="/shopreg" element={<LoggedRoute element={<ShopRegister />} />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />


    </>
  )
}

export default App
