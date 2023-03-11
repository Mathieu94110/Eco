/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import "@testing-library/cypress/add-commands";
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get('[data-cy="email"]').focus().type("user-test@gmail.com", {
    delay: 50,
  });
  cy.get('[data-cy="password"]').focus().type("1234test", {
    delay: 50,
  });
  cy.get("form").submit();
});

Cypress.Commands.add("completeCreateform", () => {
  cy.wait(2000);
  cy.get("input[type=button]").should("be.disabled");
  cy.get('[data-cy="create-ad-title"]').eq(0).should("be.visible").type("Apple MacBook Pro 13'' 256 Go", {
    delay: 50,
  });
  cy.get('[data-cy="create-ad-description"]')
    .eq(0)
    .should("be.visible")
    .type(
      "Très bon état, modèle du processeur: Apple M2 8-core, capacité de stockage 256Go, taille de l'écran (pouces)13 RAM installée 8Go",
      {
        delay: 30,
      },
    );
  cy.get('[data-cy="create-ad-price"]').eq(0).should("be.visible").type("1250", {
    delay: 50,
  });
  cy.get('.select-input > [data-cy="create-ad-category"]').eq(0).should("be.visible").select("Informatique");
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      completeCreateform(): Chainable<void>;
    }
  }
}
