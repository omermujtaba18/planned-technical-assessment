describe("Home Page", () => {
  beforeEach(() => {
    cy.setCookie("token", "fake-jwt-token");

    Cypress.on("uncaught:exception", (err) => {
      if (err.message.includes("NEXT_REDIRECT")) {
        return false;
      }
    });
  });

  describe("Home Page - Empty State", () => {
    beforeEach(() => {
      cy.fixture("user-success").then((userData) => {
        cy.intercept("GET", "/users/me", {
          statusCode: 200,
          body: userData,
        }).as("userSuccess");
      });
      cy.fixture("memories-empty").then((memoriesData) => {
        cy.intercept("GET", "/memories?page=1&limit=2", {
          statusCode: 200,
          body: memoriesData,
        }).as("memoriesEmpty");
      });

      cy.visit("/");
    });

    it("should display empty state", () => {
      cy.contains("Begin your Memory Journey").should("be.visible");
      cy.contains(
        "Create your first memory and start building your personal timeline of cherished moments. Share photos, videos, and stories that matter most to you.",
      ).should("be.visible");
    });
  });

  describe("Home Page - With Memories", () => {
    beforeEach(() => {
      cy.fixture("user-success").then((userData) => {
        cy.intercept("GET", "/users/me", {
          statusCode: 200,
          body: userData,
        }).as("userSuccess");
      });
      cy.fixture("memories").then((memoriesData) => {
        cy.intercept("GET", "/memories?page=1&limit=2", {
          statusCode: 200,
          body: memoriesData,
        }).as("memories");
      });

      cy.visit("/");
    });

    it("should display memory lane details", () => {
      cy.contains("John's Memory Lane").should("be.visible");
      cy.contains("Some memory lane description").should("be.visible");
      cy.contains("Memory Title").should("be.visible");
      cy.contains("Memory description").should("be.visible");
      cy.contains("Create Memory").should("be.visible");
      cy.contains("Share").should("be.visible");
    });

    it("should open the share modal and display share link", () => {
      cy.get("button[id='share-button']").click();
      cy.contains("Share your memories").should("be.visible");
      cy.contains("http://localhost:3000/share/1").should("be.visible");
    });

    it("should open the create memory form", () => {
      cy.get("button[id='create-memory-button']").click();
      cy.contains("Create Memory").should("be.visible");
    });

    it("should show validation errors when required fields are missing", () => {
      cy.get("button[id='create-memory-button']").click();
      cy.contains("Create Memory").should("be.visible");
      cy.get("button[type='submit']").click();
      cy.contains("Title is required").should("be.visible");
      cy.contains("At least one image is required").should("be.visible");
      cy.contains("Description is required").should("be.visible");
    });

    it("should successfully create a memory", () => {
      cy.get("button[id='create-memory-button']").click();
      cy.contains("Create Memory").should("be.visible");
      cy.get("input[id='title']").type("A New Memory");
      cy.get("input[id='timestamp']").type("2024-02-25T10:30");
      cy.get("textarea[id='description']").type(
        "This is a description of a new memory.",
      );

      const fileName = "example-image.jpg";
      cy.get("input[id='files']").selectFile(`cypress/fixtures/${fileName}`, {
        force: true,
      });

      cy.fixture("memory").then((memoryData) => {
        cy.intercept("POST", "/memories", {
          statusCode: 201,
          body: memoryData,
        }).as("createMemory");
      });

      cy.get("button[type='submit']").click({ force: true });
      cy.wait("@createMemory");

      cy.contains("A New Memory").should("be.visible");
      cy.contains("This is a description of a new memory.").should(
        "be.visible",
      );
    });
  });
});
