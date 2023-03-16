describe("signup", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should user already exist and display error message", () => {
    cy.contains("h1", /Connection/).should("exist");
    cy.getByTestId("create-account-link").click();
    cy.contains("h1", /Inscription/).should("exist");
    cy.get('input[placeholder*="Prénom"]').should("exist");
    cy.get('input[placeholder*="Prénom"]').type("test-firstname", {
      delay: 50,
    });
    cy.get('input[placeholder*="Nom"]').type("test-lastname", {
      delay: 50,
    });
    cy.get('input[placeholder*="Téléphone"]').type("101010101", {
      delay: 50,
    });
    cy.get('input[placeholder*="Email"]').type("user-test@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder*="Adresse"]').type("14 rue du général leclerc", {
      delay: 50,
    });
    cy.get('input[placeholder*="Code postal"]').type("75012", {
      delay: 50,
    });
    cy.get('input[placeholder*="Pseudo"]').type("user-test@gmail.com", {
      delay: 50,
    });
    cy.get('input[placeholder*="Mot de passe"]').type("1234test", {
      delay: 50,
    });
    cy.get("form").submit();
    cy.getByTestId("user-exist-error").should("be.visible");
  });

  it("should display email and pasword are required", () => {
    cy.contains("h1", /Connection/).should("exist");
    cy.getByTestId("create-account-link").click();
    cy.contains("h1", /Inscription/).should("exist");
    cy.get('input[placeholder*="Prénom"]').should("exist");
    cy.get('input[placeholder*="Prénom"]').type("test-firstname", {
      delay: 50,
    });
    cy.get('input[placeholder*="Nom"]').type("test-lastname", {
      delay: 50,
    });
    cy.get('input[placeholder*="Téléphone"]').type("101010101", {
      delay: 50,
    });
    cy.get('input[placeholder*="Adresse"]').type("14 rue du général leclerc", {
      delay: 50,
    });
    cy.get('input[placeholder*="Code postal"]').type("75012", {
      delay: 50,
    });
    cy.get('input[placeholder*="Pseudo"]').type("user-test@gmail.com", {
      delay: 50,
    });
    cy.get("form").submit();
    cy.getByTestId("signup-error-email").should("be.visible").and("have.text", "L'émail est requis");
    cy.getByTestId("signup-error-password").should("be.visible").and("have.text", "Le mot de passe est requis");
  });
});
