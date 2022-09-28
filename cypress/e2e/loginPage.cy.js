describe("unauthorized login attempt", () => {
  it("displays a flash notification", () => {
    cy.clearLocalStorage();
    cy.visit("login");
    cy.intercept("POST", "/api/v1/login", {
      statusCode: 401,
      fixture: "loginUnauthorized"
    }).as(
      "login"
    );

    cy.get("#inputEmail").type("demo_user@test.com");
    cy.get("#inputPassword").type("wrongPassword");
    cy.get("#loginButton").click();

    cy.wait("@login");
    cy.get(".notification-title").contains("Unauthorized");
    cy.get(".notification-content").contains("Invalid username or password");
  });
});
