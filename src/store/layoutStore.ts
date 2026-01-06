import { create } from "zustand";
import { APP_CONFIG } from "../app.config";

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
  cardHeight: APP_CONFIG.layout.card.cardHeight,
  cardWidth: APP_CONFIG.layout.card.cardWidth,
  cardSpace: APP_CONFIG.layout.card.cardSpace,
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
