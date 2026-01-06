import { create } from "zustand";

type LayoutState = {
  cardHeight: number;
  cardWidth: number;
  cardSpace: number;
  branchHeight: number;
  headerHeight: number;
  setCardHeight: (cardHeight: number) => void;
  setCardWidth: (cardHeight: number) => void;
  setCardSpace: (cardHeight: number) => void;
  setBranchHeight: (cardHeight: number) => void;
  setHeaderHeight: (cardHeight: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  cardHeight: 170,
  cardWidth: 270,
  cardSpace: 12,
  branchHeight: 48,
  headerHeight: 48,
  setCardHeight: (receivedValue) => set({ cardHeight: receivedValue }),
  setCardWidth: (receivedValue) => set({ cardWidth: receivedValue }),
  setCardSpace: (receivedValue) => set({ cardSpace: receivedValue }),
  setBranchHeight: (receivedValue) => set({ branchHeight: receivedValue }),
  setHeaderHeight: (receivedValue) => set({ headerHeight: receivedValue }),
}));
