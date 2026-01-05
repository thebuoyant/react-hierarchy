import { create } from "zustand";
import { HierarchyNode } from "../types/data.type";
import { MOCK_DATA } from "../_mock/mock-data";

type DataState = {
  data: HierarchyNode;
  setData: (data: HierarchyNode) => void;
  resetData: () => void;
};

export const useDataStore = create<DataState>((set) => ({
  data: MOCK_DATA,
  setData: (receivedValue) => set({ data: receivedValue }),
  resetData: () => set({ data: MOCK_DATA }),
}));
