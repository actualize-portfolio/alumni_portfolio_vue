describe("favoriteBooks", () => {
  it("can navigate to favoriteBooks and back", () => {
    cy.clearLocalStorage();
    cy.visit("/");

    cy.get(".nav-link").contains("Favorite Books").click();

    cy.intercept("POST", "/api/v1/login", { fixture: "loginResponse" }).as(
      "login"
    );
    cy.intercept("GET", "/api/v1/books", { fixture: "getBooks" }).as(
      "getBooks"
    );
    cy.get("#loginButton").click();

    cy.get("h1").contains("Favorite Books");

    cy.get(".img-profile").click();
    cy.get("h1").contains("Alumni Portfolio");
  });
});
