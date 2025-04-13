import React, { useState, useEffect } from "react";
import VendorBg from "./VendorBg";
import useMarketStore from "../store/marketStore";
import vendorStore from "../store/vendorStore";
import toast from "react-hot-toast";
import { getProductImage } from '../utils/productImageMap';
import { extractProductDetails } from "../utils/extractProductDetails";

// Import components
import DashboardNav from "../VendorManage/DashboardNav";
import ProductCard from "../VendorManage/ProductCard";
import ProductModal from "../VendorManage/ProductModal";
import TableView from "../VendorManage/TableView";
import AddProductForm from "../VendorManage/AddProductForm";
import DashboardStats from "../VendorManage/DashboardStats";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Main vendor dashboard page
// Manages product inventory, market data, and vendor operations
const VendorDashboard = () => {
  const categories = ["Fruits", "Vegetables", "Dairy", "Grains"];
  const [products, setProducts] = useState([]);
  const [marketData, setMarketData] = useState({ "marketName": "Local Farmers Market" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedStock, setSelectedStock] = useState("");
  const [view, setView] = useState("products");
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "in stock",
    price: "",
    category: "",
    images: null,
    unit: "kg",
  });
  const [transcript, setTranscript] = useState("");


  const { marketId, setMarketId } = useMarketStore();
  const { vendorId, vendors, fetchVendors, getMarketIdByVendorId, setVendorId } = vendorStore();

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  useEffect(() => {
    const storedVendorId = sessionStorage.getItem("vendorId");
    if (storedVendorId && vendors.length > 0) {
      const foundMarketId = getMarketIdByVendorId(storedVendorId);
      setMarketId(foundMarketId);
      setVendorId(storedVendorId);
    }
  }, [vendors]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/products/`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [view]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/products/`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/markets`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const newData = data.filter((market) =>
          market._id === marketId
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

  const openModal = (product) => {
    setSelectedProduct(product);
    setSelectedStock(product.stock);
    setSelectedPrice(product.price);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category) {
      toast.error("Please fill all required fields")
      return
    }

    const formData = new FormData();
    formData.append("vendorId", vendorId);
    formData.append("marketId", marketId);
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("category", newProduct.category);
    formData.append("unit", newProduct.unit);

    // if (newProduct.images) {
    //   formData.append("images", newProduct.images);
    // }
    if (newProduct.images) {
      // User uploaded image
      formData.append("images", newProduct.images);
    } else if (newProduct.mappedImage) {
      // Convert mapped image path to File object
      const response = await fetch(newProduct.mappedImage);
      const blob = await response.blob();
      const file = new File([blob], 'product-image.png', { type: 'image/png' });
      formData.append("images", file);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/products/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        toast.success("Product added successfully!")
        setNewProduct({ name: "", stock: "", price: "", category: "", images: null, unit: "kg" });
        setView("products");
        await fetchProducts();
      } else {
        toast.error("Failed to add product")
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and empty string
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setSelectedPrice(value);
    }
  };


  const handleStockChange = (e) => {
    setSelectedStock(e.target.value);
  };

  const handleStockUpdate = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`${BACKEND_URL}/products/update-stock/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock: selectedStock,
          price: selectedPrice ?? selectedProduct.price,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update stock");
        throw new Error("Failed to update stock");
      }

      toast.success("Updated successfully");
      console.log("Stock updated successfully");

      closeModal();
      await fetchProducts();
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };
  const handleDelete = async () => {
    if (!selectedProduct) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BACKEND_URL}/products/delete/${selectedProduct._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete product");
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");
      closeModal();
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const keywordMap = {
    tamatar: { name: "Tomato", category: "Vegetables" },
    pyaaz: { name: "Onion", category: "Vegetables" },
    aalu: { name: "Potato", category: "Vegetables" },
    doodh: { name: "Milk", category: "dairy" },
    cheeni: { name: "Sugar", category: "grocery" },
    kilo: "kg",
    liter: "liter",
    dozen: "dozen",
    ek: 1,
    do: 2,
    teen: 3,
    dus: 10,
    pachaas: 50,
    sau: 100,
    khatam: "out of stock",
  };
  
  const handleSpeechInput = (setNewProduct, newProduct, onComplete) => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTranscript(transcript);
      console.log("Transcript:", transcript);
  
      const parsed = await extractProductDetails(transcript);
      const updatedProduct = {
        ...newProduct,
        name: parsed.product || "",
        price: parsed.price || "",
        unit: parsed.unit || "kg",
        stock: parsed.stock || "in stock",
        category: parsed.category || ""
      };
  
      console.log("Gemini Parsed Product:", updatedProduct);
      setNewProduct(updatedProduct);
      if (onComplete) onComplete();
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (onComplete) onComplete();
    };
  
    recognition.onend = () => {
      if (onComplete) onComplete();
    };
  
    recognition.start();
  };

  const vendorData = {
    name: "Raj Traders",
    recentProducts: [
      { name: "Tomatoes", addedOn: "2025-03-07" },
      { name: "Potatoes", addedOn: "2025-03-06" },
      { name: "Carrots", addedOn: "2025-03-05" },
    ],
    totalMarketsSold: 15,
    monthsWithUs: 8,
    totalRevenue: 200 * 30 * 8,
    topSellingProducts: [
      { name: "Apples", sales: 120 },
      { name: "Bananas", sales: 90 },
      { name: "Spinach", sales: 75 },
    ],
    customerEngagement: 450,
  };

  return (
    <div className="relative min-h-[180vh] pt-20">
      <VendorBg />
      <div className="min-h-screen p-10 flex flex-col items-center">
        {/* Dashboard Heading */}
        <div className="flex flex-col items-center justify-center text-center my-5">
          <h1 className="text-4xl font-bold text-yellow-800 font-[Pixelify Sans]">
            {marketData?.marketName}
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            {marketData?.formattedDate} | 8:00 AM - 6:00 PM
          </p>
        </div>

        <DashboardNav view={view} setView={setView} />

        {view === "dashView" && (
          <DashboardStats vendorData={vendorData} />
        )}

        {view === "products" && (
          <div className="w-full max-w-2xl relative">
            <div className="grid grid-cols-5 sm:grid-cols-3 gap-2 justify-center">
              {products
                .filter(
                  (product) =>
                    product.vendorId === sessionStorage.getItem("vendorId") &&
                    product.marketId === marketId
                )
                .map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    BACKEND_URL={BACKEND_URL}
                    openModal={openModal}
                  />
                ))}
            </div>
          </div>
        )}

        <ProductModal
          isModalOpen={isModalOpen}
          selectedProduct={selectedProduct}
          selectedPrice={selectedPrice}
          selectedStock={selectedStock}
          handlePriceChange={handlePriceChange}
          handleStockChange={handleStockChange}
          handleDelete={handleDelete}
          closeModal={closeModal}
          handleStockUpdate={handleStockUpdate}
          BACKEND_URL={BACKEND_URL}
          fetchProducts={fetchProducts}
        />

        {view === "tableView" && (
          <TableView
            products={products}
            vendorId={sessionStorage.getItem("vendorId")}
            marketId={marketId}
          />
        )}

        {view === "addProduct" && (
          <AddProductForm
            newProduct={newProduct}
            setNewProduct={setNewProduct}
            addProduct={addProduct}
            handleSpeechInput={handleSpeechInput}
            categories={categories}
            fetchProducts={fetchProducts}
            transcript={transcript}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;