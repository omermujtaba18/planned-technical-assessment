describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/login");
    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
    });
  });

  it("should display login form", () => {
    cy.contains("Welcome back").should("be.visible");
    cy.get("input[id='email']").should("be.visible");
    cy.get("input[id='password']").should("be.visible");
    cy.get("button[type='submit']").should("be.visible");
  });

  it("should show error messages for empty fields", () => {
    cy.get("button[type='submit']").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should show an error for invalid credentials", () => {
    cy.fixture("login-failure").then((loginData) => {
      cy.intercept("POST", "/auth/login", {
        statusCode: 401,
        body: loginData,
      }).as("loginRequest");
    });

    cy.get("input[id='email']").type("wrong@example.com");
    cy.get("input[id='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest");

    cy.contains("Unauthorized").should("be.visible");
    cy.contains("Invalid email or password").should("be.visible");
  });

  it("should successfully log in with correct credentials", () => {
    cy.fixture("login-success").then((loginData) => {
      cy.intercept("POST", "/auth/login", {
        statusCode: 200,
        body: loginData,
      }).as("loginRequest");
    });

    cy.get("input[id='email']").type("test@example.com");
    cy.get("input[id='password']").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest");

    cy.getCookie("token").should("exist");
  });
});
