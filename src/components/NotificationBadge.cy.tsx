import * as React from "react";
import NotificationBadge from "./NotificationBadge";

describe("NotificationBadge", () => {
  it("should hide badge when count is undefined", () => {
    cy.mount(<NotificationBadge />);

    cy.get("[data-test='nav-top-notifications-count']")
      .find(".MuiBadge-badge")
      .should("have.class", "MuiBadge-invisible");

    cy.get("[data-test='nav-top-notifications-count']").find("svg").should("be.visible");
  });

  it("should hide badge when count is 0", () => {
    cy.mount(<NotificationBadge count={0} />);

    cy.get("[data-test='nav-top-notifications-count']")
      .find(".MuiBadge-badge")
      .should("have.class", "MuiBadge-invisible");
  });

  it("should display correct count for positive numbers", () => {
    cy.mount(<NotificationBadge count={5} />);

    cy.get("[data-test='nav-top-notifications-count']")
      .find(".MuiBadge-badge")
      .should("be.visible")
      .and("have.text", "5");
  });

  it("should display correct count for large numbers", () => {
    cy.mount(<NotificationBadge count={99} />);

    cy.get("[data-test='nav-top-notifications-count']")
      .find(".MuiBadge-badge")
      .should("be.visible")
      .and("have.text", "99");
  });

  it("should use custom data-test attribute when provided", () => {
    cy.mount(<NotificationBadge count={3} data-test="custom-badge" />);

    cy.get("[data-test='custom-badge']").find(".MuiBadge-badge").should("have.text", "3");
  });
});
