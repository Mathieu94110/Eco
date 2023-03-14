const createdAd = {};

describe("home", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="create-ad-link"]').click();
    cy.completeCreateform();
    cy.wait(1000);
  });

  it("should create button must become not disabled when form is correctly informed", () => {
    cy.get("input[type=button]").should("not.be.disabled");
  });
  it("should display createdAddCard, validate, cancel button and inputs be disabled when form values are valid and create button clicked", () => {
    cy.get('[data-cy="create-ad-button"]').eq(0).click();
    cy.get('[data-cy="create-ad-title"] > input').eq(0).should("be.disabled");
    cy.get('[data-cy="create-ad-description"] > textarea').eq(0).should("be.disabled");
    cy.get('[data-cy="create-ad-price"] > input').eq(0).should("be.disabled");
    cy.get('.select-input > [data-cy="create-ad-category"]').eq(0).should("be.disabled");
    cy.get('[data-cy="validate-create-button"]').contains("Valider").should("be.visible");
    cy.get('[data-cy="cancel-create-button"]').contains("Annuler").should("be.visible");
    cy.get('[data-cy="created-ad-card"]').should("be.visible");
  });
  it("should on cancel addCreated not be visible and form inputs empty", () => {
    cy.get('[data-cy="create-ad-button"]').eq(0).click();
    cy.get('[data-cy="cancel-create-button"]').eq(0).click();
  });
  it("should on create res.status has to be 201", () => {
    cy.get('[data-cy="create-ad-button"]').eq(0).click();
    cy.get('[data-cy="validate-create-button"]').contains("Valider").click();
    cy.intercept("POST", "http://localhost:3000/api/posts/postInfos").as("created-add-post");
    cy.wait("@created-add-post").its("response.statusCode").should("eq", 201);
  });
});
