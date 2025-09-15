import React from "react";
import { MemoryRouter } from "react-router-dom";
import NotificationBadge from "./NotificationBadge";
import { NotificationResponseItem } from "../models";

describe("NotificationBadge", () => {
  const mockNotifications: NotificationResponseItem[] = [
    {
      id: "1",
      uuid: "uuid-1",
      userId: "user-1",
      transactionId: "trans-1",
      isRead: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
      userFullName: "John Doe",
      likeId: "like-1",
    } as any,
    {
      id: "2",
      uuid: "uuid-2",
      userId: "user-1",
      transactionId: "trans-2",
      isRead: false,
      createdAt: new Date(),
      modifiedAt: new Date(),
      userFullName: "Jane Smith",
      commentId: "comment-1",
    } as any,
  ];

  it("hides badge when notifications array is empty", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge notifications={[]} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("not.contain.text");
    cy.get("[data-test=nav-top-notifications-link]").should("exist");
  });

  it("hides badge when notifications is undefined", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("not.contain.text");
  });

  it("displays correct count for single notification", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge notifications={[mockNotifications[0]]} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("contain.text", "1");
  });

  it("displays correct count for multiple notifications", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge notifications={mockNotifications} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-count]").should("contain.text", "2");
  });

  it("links to notifications page", () => {
    cy.mount(
      <MemoryRouter>
        <NotificationBadge notifications={mockNotifications} />
      </MemoryRouter>
    );

    cy.get("[data-test=nav-top-notifications-link]").should("have.attr", "href", "/notifications");
  });
});
