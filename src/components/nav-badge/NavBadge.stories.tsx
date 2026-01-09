import type { Meta, StoryObj } from "@storybook/react";
import NavBadge from "./NavBadge";

const meta: Meta<typeof NavBadge> = {
  title: "Components/NavBadge",
  component: NavBadge,
  args: {
    counter: 3,
    direction: "left",
    isVisible: true,
  },
  argTypes: {
    counter: {
      control: { type: "number", min: 0 },
      description: "Anzahl der Child-Nodes",
    },
    isVisible: {
      control: "boolean",
      description: "Ob der Badge aktuell sichtbar ist",
    },
    direction: {
      control: "select",
      description: "Richtung",
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
          "NavBadge zeigt die Anzahl der Child-Nodes an und signalisiert Expand/Collapse.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavBadge>;

export const Default: Story = {};
