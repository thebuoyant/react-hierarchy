import { create } from "zustand";
import { HierarchyNode } from "../types/data.type";

type CardLayerState = {
  rootNode: HierarchyNode;

  cardLayer_A_Data: HierarchyNode[];
  cardLayer_B_Data: HierarchyNode[];
  cardLayer_C_Data: HierarchyNode[];
  cardLayer_Tmp_Data: HierarchyNode[];

  cardLayer_A_FirstItemIndexNumber: number;
  cardLayer_B_FirstItemIndexNumber: number;
  cardLayer_C_FirstItemIndexNumber: number;
  cardLayer_TMP_FirstItemIndexNumber: number;

  cardLayer_A_JustifyContent: "flex-start" | "center" | "flex-end";
  cardLayer_B_JustifyContent: "flex-start" | "center" | "flex-end";
  cardLayer_C_JustifyContent: "flex-start" | "center" | "flex-end";

  layer_A_RowIndexNumber: number;
  layer_B_RowIndexNumber: number;
  layer_C_RowIndexNumber: number;

  connectedNodeIdLayerA: string;
  connectedNodeIdLayerB: string;
  connectedNodeIdLayerC: string;

  setRootNode: (root: HierarchyNode) => void;

  setCardLayer_A_Data: (data: HierarchyNode[]) => void;
  setCardLayer_B_Data: (data: HierarchyNode[]) => void;
  setCardLayer_C_Data: (data: HierarchyNode[]) => void;
  setCardLayer_Tmp_Data: (data: HierarchyNode[]) => void;

  setCardLayer_A_FirstItemIndexNumber: (index: number) => void;
  setCardLayer_B_FirstItemIndexNumber: (index: number) => void;
  setCardLayer_C_FirstItemIndexNumber: (index: number) => void;
  setCardLayer_TMP_FirstItemIndexNumber: (index: number) => void;

  setCardLayer_A_JustifyContent: (
    justifyContent: "flex-start" | "center" | "flex-end"
  ) => void;
  setCardLayer_B_JustifyContent: (
    justifyContent: "flex-start" | "center" | "flex-end"
  ) => void;
  setCardLayer_C_JustifyContent: (
    justifyContent: "flex-start" | "center" | "flex-end"
  ) => void;

  setLayer_A_RowIndexNumber: (index: number) => void;
  setLayer_B_RowIndexNumber: (index: number) => void;
  setLayer_C_RowIndexNumber: (index: number) => void;

  setConnectedNodeIdLayerA: (nodeId: string) => void;
  setConnectedNodeIdLayerB: (nodeId: string) => void;
  setConnectedNodeIdLayerC: (nodeId: string) => void;
};

export const useCardLayerStore = create<CardLayerState>((set) => ({
  rootNode: {
    id: "NodeA",
    headerTitle: "Node-A",
    headerSubTitle: "Node-A-Subtitle",
    content: {
      valueA: "Node-A-Value-A",
      valueB: "Node-A-Value-B",
    },
    contentType: "person",
    avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
    showAvatar: true,
    layout: {
      headerBackgroundColor: "#123456",
      headerTitleColor: "#ffffff",
      headerSubtitleColor: "#cccccc",
    },
    children: [],
  },

  cardLayer_A_Data: [],
  cardLayer_B_Data: [],
  cardLayer_C_Data: [],
  cardLayer_Tmp_Data: [],

  cardLayer_A_FirstItemIndexNumber: 0,
  cardLayer_B_FirstItemIndexNumber: 0,
  cardLayer_C_FirstItemIndexNumber: 0,
  cardLayer_TMP_FirstItemIndexNumber: 0,

  cardLayer_A_JustifyContent: "center",
  cardLayer_B_JustifyContent: "center",
  cardLayer_C_JustifyContent: "center",

  layer_A_RowIndexNumber: 0,
  layer_B_RowIndexNumber: 1,
  layer_C_RowIndexNumber: 2,

  connectedNodeIdLayerA: "",
  connectedNodeIdLayerB: "",
  connectedNodeIdLayerC: "",

  setRootNode: (receivedValue) => set({ rootNode: receivedValue }),

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
  setCardLayer_TMP_FirstItemIndexNumber: (receivedValue) =>
    set({ cardLayer_TMP_FirstItemIndexNumber: receivedValue }),

  setCardLayer_A_JustifyContent: (receivedValue) =>
    set({ cardLayer_A_JustifyContent: receivedValue }),
  setCardLayer_B_JustifyContent: (receivedValue) =>
    set({ cardLayer_B_JustifyContent: receivedValue }),
  setCardLayer_C_JustifyContent: (receivedValue) =>
    set({ cardLayer_C_JustifyContent: receivedValue }),

  setLayer_A_RowIndexNumber: (receivedValue) =>
    set({ layer_A_RowIndexNumber: receivedValue }),
  setLayer_B_RowIndexNumber: (receivedValue) =>
    set({ layer_B_RowIndexNumber: receivedValue }),
  setLayer_C_RowIndexNumber: (receivedValue) =>
    set({ layer_C_RowIndexNumber: receivedValue }),

  setConnectedNodeIdLayerA: (receivedValue) =>
    set({ connectedNodeIdLayerA: receivedValue }),
  setConnectedNodeIdLayerB: (receivedValue) =>
    set({ connectedNodeIdLayerB: receivedValue }),
  setConnectedNodeIdLayerC: (receivedValue) =>
    set({ connectedNodeIdLayerC: receivedValue }),
}));
