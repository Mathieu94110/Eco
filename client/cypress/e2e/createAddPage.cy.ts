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
  it("should display createdAdCard, validate, cancel button and inputs be disabled when form values are valid and create button clicked", () => {
    cy.getByTestId("create-ad-button").eq(0).click();
    cy.get('[data-cy="create-ad-title"] > input').eq(0).should("be.disabled");
    cy.get('[data-cy="create-ad-description"] > textarea').eq(0).should("be.disabled");
    cy.get('[data-cy="create-ad-price"] > input').eq(0).should("be.disabled");
    cy.get('.select-input > [data-cy="create-ad-category"]').eq(0).should("be.disabled");
    cy.getByTestId("validate-create-button").contains("Valider").should("be.visible");
    cy.getByTestId("cancel-create-button").contains("Annuler").should("be.visible");
    cy.getByTestId("created-ad-card").should("be.visible");
  });
  it("should on cancel adCreated not be visible and form inputs empty", () => {
    cy.getByTestId("create-ad-button").eq(0).click();
    cy.getByTestId("cancel-create-button").eq(0).click();
  });
  it("should on create res.status has to be 201", () => {
    cy.intercept("POST", "/api/posts/postInfos").as("created-ad-post");
    cy.getByTestId("create-ad-button").eq(0).click();
    cy.getByTestId("validate-create-button").contains("Valider").click();
    cy.wait("@created-ad-post").its("response.statusCode").should("eq", 201);
  });
});
