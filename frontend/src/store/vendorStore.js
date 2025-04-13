import { create } from "zustand";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const vendorStore = create((set,get) => ({
  vendorId: null,
  vendors:[],
  setVendors: (vendors) => set({ vendors }),
  setVendorId: (id) => {
    set({ vendorId: id });
  },

  
  fetchVendors: async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/vendors`); // Adjust API URL
        if (!response.ok) throw new Error("Failed to fetch vendors");
        const data = await response.json();
        set({ vendors: data });
    } catch (error) {
        console.error("Error fetching vendors:", error);
    }
},
getMarketIdByVendorId: (vendorId) => {
  const vendor = get().vendors.find(v => v._id === vendorId);
  return vendor ? vendor.marketId : null;
}
}));

export default vendorStore;