import { create } from "zustand";

// Market state management
// Handles market data and vendor-market relationships
const useMarketStore = create((set) => ({
  marketId: null,
  setMarketId: (id) => {
    set({ marketId: id });
  },
}));

export default useMarketStore;
