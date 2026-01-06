import type { Meta, StoryObj } from "@storybook/react";
import GraphBadge from "./GraphBadge";

const meta: Meta<typeof GraphBadge> = {
  title: "Components/GraphBadge",
  component: GraphBadge,
  args: {
    counter: 3,
    isExpanded: false,
    nodeId: "Node-AA",
    positionIndex: 0,
  },
  argTypes: {
    counter: {
      control: { type: "number", min: 0 },
      description: "Anzahl der Child-Nodes",
    },
    isExpanded: {
      control: "boolean",
      description: "Ob der Node aktuell expandiert ist",
    },
    nodeId: {
      control: "text",
      description: "ID des Nodes",
    },
    positionIndex: {
      control: { type: "number", min: 0 },
      description: "Position des Nodes innerhalb des Parents",
    },
    onClick: {
      action: "badge-clicked",
      description: "Click-Callback mit Expand-Informationen",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "GraphBadge zeigt die Anzahl der Child-Nodes an und signalisiert Expand/Collapse.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GraphBadge>;

export const Default: Story = {};
