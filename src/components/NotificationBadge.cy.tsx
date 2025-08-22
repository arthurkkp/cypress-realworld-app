import React from "react";
import NotificationBadge from "./NotificationBadge";

describe("NotificationBadge Component", () => {
  it("should hide badge with zero notifications", () => {
    cy.mount(<NotificationBadge count={0} />);
    cy.get("[data-test=nav-top-notifications-count]").should("exist");
    cy.get("[data-test=nav-top-notifications-count]").should("not.contain.text");
  });

  it("should hide badge with undefined count", () => {
    cy.mount(<NotificationBadge />);
    cy.get("[data-test=nav-top-notifications-count]").should("exist");
    cy.get("[data-test=nav-top-notifications-count]").should("not.contain.text");
  });

  it("should display correct count for positive numbers", () => {
    cy.mount(<NotificationBadge count={7} />);
    cy.get("[data-test=nav-top-notifications-count]").should("contain.text", "7");
  });

  it("should display large numbers correctly", () => {
    cy.mount(<NotificationBadge count={42} />);
    cy.get("[data-test=nav-top-notifications-count]").should("contain.text", "42");
  });
});
