import type { Meta, StoryObj } from "@storybook/react";
import ReactHierarchy from "./ReactHierarchy";

const meta: Meta<typeof ReactHierarchy> = {
  title: "Components/ReactHierarchy",
  component: ReactHierarchy,
  tags: ["autodocs"],
  args: {
    title: "React Hierarchy",
    showTitle: true,
    titleType: "h3",
  },
  argTypes: {
    title: {
      control: "text",
      description: "Titeltext",
    },
    showTitle: {
      control: "boolean",
      description: "Titel anzeigen/ausblenden",
    },
    titleType: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "MUI Typography Variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactHierarchy>;

export const Default: Story = {};
