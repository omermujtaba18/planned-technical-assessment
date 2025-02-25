describe("Settings Page", () => {
  beforeEach(() => {
    cy.setCookie("token", "fake-jwt-token");

    cy.fixture("user-success").then((userData) => {
      cy.intercept("GET", "/users/me", {
        statusCode: 200,
        body: userData,
      }).as("userSuccess");
    });

    cy.visit("/settings");

    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
    });
  });

  it("should display settings form", () => {
    cy.contains("Settings").should("be.visible");
    cy.contains("Manage your profile and security settings").should(
      "be.visible",
    );
    cy.get("input[id='fullName']").should("be.visible");
    cy.get("textarea[id='memoryLaneDescription']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  it("should show error messages for empty fields", () => {
    cy.get("input[id='fullName']").clear();
    cy.get("button[type='submit']").click();
    cy.contains("Full name is required").should("be.visible");
  });

  it("should successfully update profile", () => {
    cy.fixture("user-success").then((userData) => {
      cy.intercept("PATCH", "/users/me", {
        statusCode: 200,
        body: userData,
      }).as("userPatch");
    });

    cy.get("input[id='fullName']").clear().type("John Doe Updated");
    cy.get("textarea[id='memoryLaneDescription']")
      .clear()
      .type("Updated Memory Lane Description");
    cy.get("button[type='submit']").click();
    cy.wait("@userPatch");

    cy.get("input[id='fullName']").should("have.value", "John Doe Updated"); // ✅ Fix
  });
});
