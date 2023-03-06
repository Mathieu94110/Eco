const BASE_URL = "http://localhost:3000/api/favorites";

const testUserId = { userFrom: "6405d61927b8a37356ce3a88" };

describe("home", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should get favorites request succeed and getting the 4 favorites", () => {
    cy.get('[data-cy="favorite-link"]').click();

    cy.intercept("POST", `^${BASE_URL}/`, {
      body: JSON.stringify(testUserId),
      headers: {
        "Content-Type": "application/json",
      },
      fixture: "favorites.json",
    }).as("user-favorites");
    cy.wait("@user-favorites").its("response.statusCode").should("eq", 200);

    cy.get("@user-favorites")
      .its("response.body")
      .should("have.property", "favorites")
      .and("have.length", 4)

      .and((fav) => {
        expect(fav[0]).to.deep.eq({
          category: "smartphones",
          description:
            "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
          discountPercentage: 17.94,
        });

        expect(fav[1]).to.deep.eq({
          category: "furniture",
          description: "Mornadi Velvet Bed Base with Headboard Slats Support Classic Style Bedroom Furniture Bed Set",
          discountPercentage: 40,
        });

        expect(fav[2]).to.deep.eq({
          category: "growceries",
          description: "Fine quality Branded Product Keep in a cool and dry place",
          discountPercentage: 20,
        });

        expect(fav[3]).to.deep.eq({
          category: "tops",
          description:
            "Cotton Solid Color Professional Wear Sleeve Shirt Womens Work Blouses Wholesale Clothing Casual Plain Custom Top OEM Customized",
          discountPercentage: 90,
        });
      });
  });
});
