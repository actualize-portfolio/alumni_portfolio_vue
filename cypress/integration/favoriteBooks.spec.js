describe("e2e", () => {
  it("can navigate to favoriteBooks and back", () => {
    cy.visit("/");
    cy.get(".nav-link").contains("Favorite Books").click();
    cy.get("#loginButton").click();
    cy.get("h1").contains("Favorite Books");
    cy.get(".img-profile").click();
    cy.get("h1").contains("Alumni Portfolio");
  });
});
