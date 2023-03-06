// https://docs.cypress.io/api/introduction/api.html

describe("should user been connected sucessfully", () => {
  beforeEach(() => {
    cy.login();
  });
  it("should display profile page info when user logged", () => {
    cy.wait(1000);
    cy.get('[data-cy="profile-header"]').should("have.text", "Mon profil");
    cy.get('[data-cy="user-profile-card"]').should("be.visible");
  });
});
