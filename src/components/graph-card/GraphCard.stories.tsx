import type { Meta, StoryObj } from "@storybook/react";
import GraphCard from "./GraphCard";
import { HierarchyNode } from "../../types/data.type";
import React from "react";

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
  showAvatar: true,
  layout: {
    headerBackgroundColor: "#123456",
    headerTitleColor: "#ffffff",
    headerSubtitleColor: "#cccccc",
  },
  children: [],
};

const meta: Meta<typeof GraphCard> = {
  title: "Components/GraphCard",
  component: GraphCard,
  args: {
    node: mockNode,
    showBadge: true,
    showChildren: true,
    positionIndex: 0,
    isSelected: true,
    isDimmed: false,
    isConnected: true,
    content: (
      <div>
        <strong>Custom Content</strong>
        <div>Value A</div>
        <div>Value B</div>
      </div>
    ),
  },
  argTypes: {
    showBadge: {
      control: "boolean",
      description: "Badge anzeigen",
    },
    showChildren: {
      control: "boolean",
      description: "Node ist expanded/ausgewählt",
    },
    isSelected: {
      control: "boolean",
      description: "Fokus-Zustand (visuelles Highlight)",
    },
    isDimmed: {
      control: "boolean",
      description: "Dezent anzeigen (nicht im Fokus)",
    },
    isConnected: {
      control: "boolean",
      description: "Gehört zur aktuellen Fokus-Spur",
    },
    positionIndex: {
      control: { type: "number", min: 0 },
      description: "Index des Nodes im Layer",
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
