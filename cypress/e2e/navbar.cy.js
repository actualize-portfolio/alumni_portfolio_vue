describe("click login link", () => {
  it("directs us to the login page and changes the link to logout and redirects to landing page.", () => {
    cy.clearLocalStorage();
    cy.visit("/");
    cy.get("#login");
    cy.get("#login").contains("Log In");
    cy.get("#login").click();

    cy.intercept("POST", "/api/v1/login", {
      statusCode: 200,
      fixture: "loginResponse",
    }).as("login");

    cy.get("#inputEmail").type("demo_user@test.com");
    cy.get("#inputPassword").type("correctPassword");
    cy.get("#loginButton").click();

    cy.wait("@login");
    cy.get("#login")
      .contains("Log Out")
      .then(($el) => $el.click());
    cy.location("pathname").should("eq", "/");
  });
});
