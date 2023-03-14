describe("should user been connected sucessfully", () => {
  it("should display profile page info when user logged", () => {
    cy.login();
    cy.get('[data-cy="profile-header"]').should("have.text", "Mon profil");
    cy.get('[data-cy="user-profile-card"]').should("be.visible");
  });
  it("should login failed", () => {
    cy.visit("/");
    cy.get('[data-cy="email"]').focus().type("fake-user-test@gmail.com", {
      delay: 50,
    });
    cy.get('[data-cy="password"]').focus().type("1234test", {
      delay: 50,
    });
    cy.get("form").submit();
  });
});
