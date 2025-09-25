import React from "react";
import NotificationBadge from "./NotificationBadge";

describe("NotificationBadge", () => {
  it("should hide badge when count is 0", () => {
    cy.mount(<NotificationBadge count={0} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("not.have.text");

    cy.get("[data-test=notification-badge]").find("svg").should("be.visible");
  });

  it("should hide badge when count is undefined", () => {
    cy.mount(<NotificationBadge data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("not.have.text");

    cy.get("[data-test=notification-badge]").find("svg").should("be.visible");
  });

  it("should display correct count for positive numbers", () => {
    cy.mount(<NotificationBadge count={5} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("contain.text", "5");
  });

  it("should display correct count for large numbers", () => {
    cy.mount(<NotificationBadge count={99} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("contain.text", "99");
  });

  it("should apply custom className", () => {
    cy.mount(
      <NotificationBadge count={3} data-test="notification-badge" className="custom-badge-class" />
    );

    cy.get("[data-test=notification-badge]")
      .find(".MuiBadge-badge")
      .should("have.class", "custom-badge-class");
  });

  it("should render notification icon", () => {
    cy.mount(<NotificationBadge count={1} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").find("svg").should("be.visible");
  });

  it("should hide badge when count is negative", () => {
    cy.mount(<NotificationBadge count={-1} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("not.have.text");

    cy.get("[data-test=notification-badge]").find("svg").should("be.visible");
  });

  it("should display count of 1 correctly", () => {
    cy.mount(<NotificationBadge count={1} data-test="notification-badge" />);

    cy.get("[data-test=notification-badge]").should("contain.text", "1");
  });

  it("should display very large numbers correctly", () => {
    cy.mount(<NotificationBadge count={999} data-test="notification-badge" />);
    
    cy.get("[data-test=notification-badge]").should("contain.text", "99+");
  });
});
