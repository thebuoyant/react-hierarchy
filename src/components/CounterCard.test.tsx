import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material";
import CounterCard from "./CounterCard";
import { useCounterStore } from "../store/counterStore";

const wrap = (ui: React.ReactElement) => (
  <ThemeProvider theme={createTheme({ palette: { mode: "light" } })}>{ui}</ThemeProvider>
);

describe("CounterCard", () => {
  beforeEach(() => {
    useCounterStore.getState().reset();
  });

  it("increments and decrements", () => {
    render(wrap(<CounterCard />));

    expect(screen.getByLabelText("counter-value")).toHaveTextContent("0");

    fireEvent.click(screen.getByRole("button", { name: "+1" }));
    expect(screen.getByLabelText("counter-value")).toHaveTextContent("1");

    fireEvent.click(screen.getByRole("button", { name: "-1" }));
    expect(screen.getByLabelText("counter-value")).toHaveTextContent("0");
  });

  it("sets value via input", () => {
    render(wrap(<CounterCard />));

    const input = screen.getByLabelText("counter-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "7" } });

    expect(screen.getByLabelText("counter-value")).toHaveTextContent("7");
  });
});
