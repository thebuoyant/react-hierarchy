import { create } from "zustand";
import { HierarchyNode } from "../types/data.type";

type CardLayerState = {
  cardLayer_A_Data: HierarchyNode[];
  cardLayer_B_Data: HierarchyNode[];
  cardLayer_C_Data: HierarchyNode[];
  cardLayer_Tmp_Data: HierarchyNode[];

  cardLayer_A_FirstItemIndexNumber: number;
  cardLayer_B_FirstItemIndexNumber: number;
  cardLayer_C_FirstItemIndexNumber: number;

  cardLayer_A_JustifyContent: "flex-start" | "center" | "flex-end";
  cardLayer_B_JustifyContent: "flex-start" | "center" | "flex-end";

  setCardLayer_A_Data: (data: HierarchyNode[]) => void;
  setCardLayer_B_Data: (data: HierarchyNode[]) => void;
  setCardLayer_C_Data: (data: HierarchyNode[]) => void;
  setCardLayer_Tmp_Data: (data: HierarchyNode[]) => void;

  setCardLayer_A_FirstItemIndexNumber: (index: number) => void;
  setCardLayer_B_FirstItemIndexNumber: (index: number) => void;
  setCardLayer_C_FirstItemIndexNumber: (index: number) => void;

  setCardLayer_A_JustifyContent: (
    justifyContent: "flex-start" | "center" | "flex-end"
  ) => void;
  setCardLayer_B_JustifyContent: (
    justifyContent: "flex-start" | "center" | "flex-end"
  ) => void;
};

export const useCardLayerStore = create<CardLayerState>((set) => ({
  cardLayer_A_Data: [],
  cardLayer_B_Data: [],
  cardLayer_C_Data: [],
  cardLayer_Tmp_Data: [],

  cardLayer_A_FirstItemIndexNumber: 0,
  cardLayer_B_FirstItemIndexNumber: 0,
  cardLayer_C_FirstItemIndexNumber: 0,

  cardLayer_A_JustifyContent: "center",
  cardLayer_B_JustifyContent: "center",

  setCardLayer_A_Data: (receivedValue) =>
    set({ cardLayer_A_Data: receivedValue }),
  setCardLayer_B_Data: (receivedValue) =>
    set({ cardLayer_B_Data: receivedValue }),
  setCardLayer_C_Data: (receivedValue) =>
    set({ cardLayer_C_Data: receivedValue }),
  setCardLayer_Tmp_Data: (receivedValue) =>
    set({ cardLayer_Tmp_Data: receivedValue }),

  setCardLayer_A_FirstItemIndexNumber: (receivedValue) =>
    set({ cardLayer_A_FirstItemIndexNumber: receivedValue }),
  setCardLayer_B_FirstItemIndexNumber: (receivedValue) =>
    set({ cardLayer_B_FirstItemIndexNumber: receivedValue }),
  setCardLayer_C_FirstItemIndexNumber: (receivedValue) =>
    set({ cardLayer_C_FirstItemIndexNumber: receivedValue }),

  setCardLayer_A_JustifyContent: (receivedValue) =>
    set({ cardLayer_A_JustifyContent: receivedValue }),
  setCardLayer_B_JustifyContent: (receivedValue) =>
    set({ cardLayer_B_JustifyContent: receivedValue }),
}));
