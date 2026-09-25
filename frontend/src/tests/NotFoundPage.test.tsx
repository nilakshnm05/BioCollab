import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/components/NotFoundPage";

describe("NotFoundPage", () => {
  it("shows the page not found message", () => {
    render(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist."),
    ).toBeInTheDocument();
  });
});
