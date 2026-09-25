import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  it("increments the count when the user clicks the button", async () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "Increment" });
    const user = userEvent.setup();
    await user.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
