describe("should user been connected sucessfully", () => {
  it("should display ads page info when user logged", () => {
    cy.login();
    cy.getByTestId("ads-list-header").should("be.visible").and("have.text", "Liste des annonces");
  });
  it("should login button disabled when missing values", () => {
    cy.visit("/");
    cy.getByTestId("email").focus().type("fake-user-test@gmail.com", {
      delay: 50,
    });
    cy.get("#login-button").should("be.disabled");
  });
  it("should login failed", () => {
    cy.visit("/");
    cy.getByTestId("email").focus().type("fake-user-test@gmail.com", {
      delay: 50,
    });
    cy.getByTestId("password").focus().type("1234test", {
      delay: 50,
    });
    cy.get("form").submit();
  });
});
