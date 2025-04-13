import { create } from "zustand";

const useMarketStore = create((set) => ({
  marketId: null,
  setMarketId: (id) => {
    set({ marketId: id });
  },
}));

export default useMarketStore;
