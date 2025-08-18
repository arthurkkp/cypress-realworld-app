import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import NotificationBadge from "./NotificationBadge";

describe("NotificationBadge", () => {
  it("hides badge when count is zero", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge count={0} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("not.have.text");
    cy.get("[data-test=nav-top-notifications-link]").should("exist");
  });

  it("displays correct count for non-zero notifications", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge count={5} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("have.text", "5");
    cy.get("[data-test=nav-top-notifications-link]").should("exist");
  });

  it("displays correct count for large numbers", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge count={99} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("have.text", "99");
  });

  it("applies custom badge classes when provided", () => {
    const customClasses = { badge: "custom-badge-class" };

    cy.mount(
      <MemoryRouter>
        <NotificationBadge count={3} classes={customClasses} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("have.text", "3");
    cy.get("[data-test=nav-top-notifications-count] .MuiBadge-badge").should(
      "have.class",
      "custom-badge-class"
    );
  });
});
