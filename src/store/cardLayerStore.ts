import { create } from "zustand";
import { HierarchyNode } from "../types/data.type";

type CardLayerState = {
  cardLayer_A_Data: HierarchyNode[];
  cardLayer_B_Data: HierarchyNode[];
  cardLayer_C_Data: HierarchyNode[];
  cardLayer_Tmp_Data: HierarchyNode[];
  setCardLayer_A_Data: (data: HierarchyNode[]) => void;
  setCardLayer_B_Data: (data: HierarchyNode[]) => void;
  setCardLayer_C_Data: (data: HierarchyNode[]) => void;
  setCardLayer_Tmp_Data: (data: HierarchyNode[]) => void;
};

export const useCardLayerStore = create<CardLayerState>((set) => ({
  cardLayer_A_Data: [],
  cardLayer_B_Data: [],
  cardLayer_C_Data: [],
  cardLayer_Tmp_Data: [],
  setCardLayer_A_Data: (receivedValue) =>
    set({ cardLayer_A_Data: receivedValue }),
  setCardLayer_B_Data: (receivedValue) =>
    set({ cardLayer_B_Data: receivedValue }),
  setCardLayer_C_Data: (receivedValue) =>
    set({ cardLayer_C_Data: receivedValue }),
  setCardLayer_Tmp_Data: (receivedValue) =>
    set({ cardLayer_Tmp_Data: receivedValue }),
}));
