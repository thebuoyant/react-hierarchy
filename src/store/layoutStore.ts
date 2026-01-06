import { create } from "zustand";

export const CARD_DEFAULT_DIMENSION = {
  cardHeight: 170,
  cardWidth: 300,
  cardSpace: 12,
};

type LayoutState = {
  cardHeight: number;
  cardWidth: number;
  cardSpace: number;
  branchHeight: number;
  headerHeight: number;
  branchBackgroundColor: string;
  headerBackgroundColor: string;
  setCardHeight: (cardHeight: number) => void;
  setCardWidth: (cardWidth: number) => void;
  setCardSpace: (cardSpace: number) => void;
  setBranchHeight: (branchHeight: number) => void;
  setHeaderHeight: (branchBackgroundColor: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  cardHeight: CARD_DEFAULT_DIMENSION.cardHeight,
  cardWidth: CARD_DEFAULT_DIMENSION.cardWidth,
  cardSpace: CARD_DEFAULT_DIMENSION.cardSpace,
  branchHeight: 48,
  headerHeight: 48,
  branchBackgroundColor: "#ffffff",
  headerBackgroundColor: "#ffffff",
  setCardHeight: (receivedValue) => set({ cardHeight: receivedValue }),
  setCardWidth: (receivedValue) => set({ cardWidth: receivedValue }),
  setCardSpace: (receivedValue) => set({ cardSpace: receivedValue }),
  setBranchHeight: (receivedValue) => set({ branchHeight: receivedValue }),
  setHeaderHeight: (receivedValue) => set({ headerHeight: receivedValue }),
}));
