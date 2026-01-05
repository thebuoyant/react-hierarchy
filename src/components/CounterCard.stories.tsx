import type { Meta, StoryObj } from "@storybook/react";
import CounterCard from "./CounterCard";
import { useCounterStore } from "../store/counterStore";

const meta: Meta<typeof CounterCard> = {
  title: "Components/CounterCard",
  component: CounterCard,
  tags: ["autodocs"],
  args: {
    title: "Zähler (Storybook)",
  },
};

export default meta;
type Story = StoryObj<typeof CounterCard>;

export const Default: Story = {};

export const Prefilled: Story = {
  play: async () => {
    useCounterStore.getState().set(42);
  },
};
