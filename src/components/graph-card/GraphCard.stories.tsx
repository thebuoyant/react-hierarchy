import type { Meta, StoryObj } from "@storybook/react";
import GraphCard from "./GraphCard";
import { HierarchyNode } from "../../types/data.type";
import React from "react";
import { CARD_DEFAULT_DIMENSION } from "../../store/layoutStore";

const mockNode: HierarchyNode = {
  id: "Node-AA",
  headerTitle: "Node-AA",
  headerSubTitle: "Node-AA-Subtitle",
  content: {
    valueA: "Value A",
    valueB: "Value B",
    valueC: "Value C",
  },
  contentType: "person",
  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
  children: [],
};

const meta: Meta<typeof GraphCard> = {
  title: "Components/GraphCard",
  component: GraphCard,
  args: {
    node: mockNode,
    isActive: false,
    cardWidth: CARD_DEFAULT_DIMENSION.cardWidth,
    cardHeight: CARD_DEFAULT_DIMENSION.cardWidth,
    cardSpace: CARD_DEFAULT_DIMENSION.cardSpace,
    branchGraphHeight: 120,
    showBadge: true,
    showChildren: true,
    showParent: true,
    positionIndex: 0,
    content: (
      <div>
        <strong>Custom Content</strong>
        <div>Value A</div>
        <div>Value B</div>
      </div>
    ),
  },
  argTypes: {
    isActive: {
      control: "boolean",
      description: "Markiert die Card als aktiv",
    },
    showBadge: {
      control: "boolean",
      description: "Badge anzeigen",
    },
    showChildren: {
      control: "boolean",
      description: "Kinder visuell anzeigen",
    },
    showParent: {
      control: "boolean",
      description: "Parent-Bezug anzeigen",
    },
    cardWidth: {
      control: { type: "number", min: 100 },
      description: "Breite der Card",
    },
    cardHeight: {
      control: { type: "number", min: 80 },
      description: "Höhe der Card",
    },
    cardSpace: {
      control: { type: "number", min: 0 },
      description: "Horizontaler Abstand links/rechts",
    },
    branchGraphHeight: {
      control: { type: "number", min: 0 },
      description: "Höhe des Branch-Graphen",
    },
    positionIndex: {
      control: { type: "number", min: 0 },
      description: "Index des Nodes im Parent",
    },
    onHeaderReferClick: {
      action: "header-refer-clicked",
      description: "Click auf Header/Referenz",
    },
    onBadgeClick: {
      action: "badge-clicked",
      description: "Click auf Badge",
    },
    content: {
      control: false,
      description: "Beliebiger React-Content innerhalb der Card",
    },
    node: {
      control: false,
      description: "HierarchyNode-Datenobjekt",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "GraphCard ist die visuelle Repräsentation eines HierarchyNodes innerhalb eines Graphen.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GraphCard>;

export const Default: Story = {};
