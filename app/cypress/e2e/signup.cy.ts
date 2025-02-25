describe("Signup Page", () => {
  beforeEach(() => {
    cy.visit("/signup");

    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
    });
  });

  it("should display the signup form", () => {
    cy.contains("Hi there!").should("be.visible");
    cy.contains("Create your account to start your journey").should(
      "be.visible",
    );

    cy.get("input[id='fullName']").should("be.visible");
    cy.get("input[id='email']").should("be.visible");
    cy.get("input[id='password']").should("be.visible");
    cy.get("button[type='submit']").should("contain.text", "Create Account");
  });

  it("should show error messages for empty fields", () => {
    cy.get("button[type='submit']").click();

    cy.contains("Full name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should show an error for existing email", () => {
    cy.fixture("signup-failure").then((signupData) => {
      cy.intercept("POST", "/auth/signup", {
        statusCode: 400,
        body: signupData,
      }).as("signupRequest");
    });

    cy.get("input[id='fullName']").type("John Doe");
    cy.get("input[id='email']").type("existing@example.com");
    cy.get("input[id='password']").type("securepassword123");
    cy.get("button[type='submit']").click();

    cy.wait("@signupRequest");

    cy.contains("Account with the provided email already exists").should(
      "be.visible",
    );
  });

  it("should successfully sign up with valid credentials", () => {
    cy.fixture("signup-success").then((signupData) => {
      cy.intercept("POST", "/auth/signup", {
        statusCode: 200,
        body: signupData,
      }).as("signupRequest");
    });

    cy.get("input[id='fullName']").type("John Doe");
    cy.get("input[id='email']").type("newuser@example.com");
    cy.get("input[id='password']").type("password123");
    cy.get("button[type='submit']").click();

    cy.wait("@signupRequest");

    cy.getCookie("token").should("exist");
  });
});
