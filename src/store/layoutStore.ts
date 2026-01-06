import { create } from "zustand";
import { APP_CONFIG } from "../app.config";

type LayoutState = {
  cardHeight: number;
  cardWidth: number;
  cardSpace: number;
  cardHeaderBackgroundColor: string;
  cardHeaderTitleColor: string;
  cardHeaderSubTitleColor: string;
  branchHeight: number;
  headerHeight: number;
  branchBackgroundColor: string;
  setCardHeight: (cardHeight: number) => void;
  setCardWidth: (cardWidth: number) => void;
  setCardSpace: (cardSpace: number) => void;
  setCardHeaderBackgroundColor: (cardHeaderBackgroundColor: string) => void;
  setCardHeaderTitleColor: (cardHeaderTitleColor: string) => void;
  setCardHeaderSubTitleColor: (cardHeaderSubTitleColor: string) => void;
  setBranchHeight: (branchHeight: number) => void;
  setHeaderHeight: (branchBackgroundColor: number) => void;
};

export const useLayoutStore = create<LayoutState>((set) => ({
  cardHeight: APP_CONFIG.layout.card.cardHeight,
  cardWidth: APP_CONFIG.layout.card.cardWidth,
  cardSpace: APP_CONFIG.layout.card.cardSpace,
  cardHeaderBackgroundColor: APP_CONFIG.layout.card.cardHeaderBackgroundColor,
  cardHeaderTitleColor: APP_CONFIG.layout.card.cardHeaderTitleColor,
  cardHeaderSubTitleColor: APP_CONFIG.layout.card.cardHeaderSubTitleColor,
  branchHeight: 48,
  headerHeight: 48,
  branchBackgroundColor: "#ffffff",
  headerBackgroundColor: "#ffffff",
  setCardHeight: (receivedValue) => set({ cardHeight: receivedValue }),
  setCardWidth: (receivedValue) => set({ cardWidth: receivedValue }),
  setCardSpace: (receivedValue) => set({ cardSpace: receivedValue }),
  setCardHeaderBackgroundColor: (receivedValue) =>
    set({ cardHeaderBackgroundColor: receivedValue }),
  setCardHeaderTitleColor: (receivedValue) =>
    set({ cardHeaderTitleColor: receivedValue }),
  setCardHeaderSubTitleColor: (receivedValue) =>
    set({ cardHeaderSubTitleColor: receivedValue }),
  setBranchHeight: (receivedValue) => set({ branchHeight: receivedValue }),
  setHeaderHeight: (receivedValue) => set({ headerHeight: receivedValue }),
}));
