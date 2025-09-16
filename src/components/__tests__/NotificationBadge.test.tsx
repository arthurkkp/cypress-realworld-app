import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import NotificationBadge from "../NotificationBadge";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotificationBadge", () => {
  it("should hide badge when count is 0", () => {
    renderWithRouter(<NotificationBadge count={0} />);
    
    const link = screen.getByRole("link");
    const badgeElement = link.querySelector('[data-test="nav-top-notifications-count"]');
    expect(badgeElement).toBeInTheDocument();
    const badge = badgeElement?.querySelector(".MuiBadge-badge");
    expect(badge).toHaveClass("MuiBadge-invisible");
  });

  it("should hide badge when count is undefined", () => {
    renderWithRouter(<NotificationBadge />);
    
    const link = screen.getByRole("link");
    const badgeElement = link.querySelector('[data-test="nav-top-notifications-count"]');
    const badge = badgeElement?.querySelector(".MuiBadge-badge");
    expect(badge).toHaveClass("MuiBadge-invisible");
  });

  it("should display correct count when count > 0", () => {
    renderWithRouter(<NotificationBadge count={5} />);
    
    const link = screen.getByRole("link", { name: "5" });
    const badgeElement = link.querySelector('[data-test="nav-top-notifications-count"]');
    expect(badgeElement).toHaveTextContent("5");
  });

  it("should display correct count for large numbers", () => {
    renderWithRouter(<NotificationBadge count={99} />);
    
    const link = screen.getByRole("link", { name: "99" });
    const badgeElement = link.querySelector('[data-test="nav-top-notifications-count"]');
    expect(badgeElement).toHaveTextContent("99");
  });

  it("should render notification icon", () => {
    renderWithRouter(<NotificationBadge count={1} />);
    
    const icon = screen.getByRole("link");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("href", "/notifications");
  });

  it("should link to notifications page", () => {
    renderWithRouter(<NotificationBadge count={1} />);
    
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/notifications");
  });
});
