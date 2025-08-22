import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotificationBadge from "../NotificationBadge";

describe("NotificationBadge", () => {
  it("should hide badge when count is 0", () => {
    render(<NotificationBadge count={0} />);
    const badge = screen.getByTestId("NotificationsIcon").parentElement;
    expect(badge).toBeInTheDocument();
    const badgeContent = badge?.querySelector(".MuiBadge-badge");
    expect(badgeContent).toHaveClass("MuiBadge-invisible");
  });

  it("should hide badge when count is undefined", () => {
    render(<NotificationBadge />);
    const badge = screen.getByTestId("NotificationsIcon").parentElement;
    expect(badge).toBeInTheDocument();
    const badgeContent = badge?.querySelector(".MuiBadge-badge");
    expect(badgeContent).toHaveClass("MuiBadge-invisible");
  });

  it("should display correct count for positive numbers", () => {
    render(<NotificationBadge count={5} />);
    const badge = screen.getByTestId("NotificationsIcon").parentElement;
    expect(badge).toBeInTheDocument();
    const badgeContent = badge?.querySelector(".MuiBadge-badge");
    expect(badgeContent).not.toHaveClass("MuiBadge-invisible");
    expect(badgeContent).toHaveTextContent("5");
  });

  it("should display correct count for large numbers", () => {
    render(<NotificationBadge count={99} />);
    const badge = screen.getByTestId("NotificationsIcon").parentElement;
    expect(badge).toBeInTheDocument();
    const badgeContent = badge?.querySelector(".MuiBadge-badge");
    expect(badgeContent).not.toHaveClass("MuiBadge-invisible");
    expect(badgeContent).toHaveTextContent("99");
  });

  it("should apply custom className when provided", () => {
    render(<NotificationBadge count={3} className="custom-badge-class" />);
    const badge = screen.getByTestId("NotificationsIcon").parentElement;
    expect(badge).toBeInTheDocument();
    const badgeContent = badge?.querySelector(".MuiBadge-badge");
    expect(badgeContent).not.toHaveClass("MuiBadge-invisible");
    expect(badgeContent).toHaveClass("custom-badge-class");
    expect(badgeContent).toHaveTextContent("3");
  });
});
