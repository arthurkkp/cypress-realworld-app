/// <reference types="cypress" />
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NotificationBadge from "./NotificationBadge";

const mount = (component: React.ReactElement) => {
  cy.mount(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NotificationBadge Component", () => {
  it("should hide badge with zero notifications", () => {
    mount(<NotificationBadge count={0} />);
    
    cy.get("[data-test=nav-top-notifications-count]").should("exist");
    cy.get("[data-test=nav-top-notifications-count]").should("not.have.text");
    cy.get(".MuiBadge-badge").should("have.class", "MuiBadge-invisible");
  });

  it("should hide badge with undefined count", () => {
    mount(<NotificationBadge />);
    
    cy.get("[data-test=nav-top-notifications-count]").should("exist");
    cy.get("[data-test=nav-top-notifications-count]").should("not.have.text");
    cy.get(".MuiBadge-badge").should("have.class", "MuiBadge-invisible");
  });

  it("should display count correctly with notifications", () => {
    mount(<NotificationBadge count={3} />);
    
    cy.get("[data-test=nav-top-notifications-count]").should("have.text", "3");
    cy.get(".MuiBadge-badge").should("be.visible");
  });

  it("should display large counts correctly", () => {
    mount(<NotificationBadge count={42} />);
    
    cy.get("[data-test=nav-top-notifications-count]").should("have.text", "42");
  });

  it("should navigate to notifications page when clicked", () => {
    mount(<NotificationBadge count={1} />);
    
    cy.get("[data-test=nav-top-notifications-link]").should("have.attr", "href", "/notifications");
  });
});
