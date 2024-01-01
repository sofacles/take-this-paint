const testName1 = "Sea88Condo";
const testEmail1 = "sofacles@yahoo.com";
const { SITE_ADMIN_EMAIL, SITE_ADMIN_PASSWORD } = Cypress.env();

describe("template spec", () => {
  beforeEach(() => {
    console.log("beforeEach");
    cy.clearCookies();
    console.log(`Cypress.env is ${JSON.stringify(Cypress.env())}`);
  });

  it("posts a paint and goes to a thank you page", () => {
    cy.visit("http://localhost:5173/give-away");

    cy.get('[data-testid="open-color-picker-btn"]').click();
    //click a color in the color picker
    cy.get('[data-testid="pixel-B77"]').click();
    cy.get('[data-testid="textbox-name"]').type("testName");
    cy.get('[data-testid="select-brand"]').select("Behr");
    cy.get('[data-testid="select-quantity"]').select("less than a gallon");
    cy.get('[data-testid="textbox-email"]').type(testEmail1);
    cy.get('[data-testid="textbox-confirmEmail"]').type(testEmail1);
    cy.get('[data-testid="select-sheen"]').select("velvet");
    cy.get('[data-testid="textbox-zipCode"]').type("16801");
    cy.get("#save").click();

    //cy.get("#result").should("be.visible");
    //cy.get("h1").should("be.visible").should("have.text", "Hey, Thanks for making your paint available!");
    cy.url().should("contain", "/thank-you");
  });

  it("shows up in the admin paints table with email not confirmed", () => {
    cy.visit("http://localhost:5173/admin/paints");
    cy.url().should("contain", "/login");
    cy.get("#email").type(SITE_ADMIN_EMAIL);
    cy.get("#password").type(SITE_ADMIN_PASSWORD);
    cy.get("button").click();
    // should go to admin page
    cy.url().should("equal", "/admin");
    cy.visit("http://localhost:5173/admin/paints");
    cy.get("td").contains(testName1).should("be.visible");
    const row = cy.get("td").contains(testName1).parent();
    //email confirmed should be false
    row.find("input [type=checkbox]").should("not.be.checked");
    //delete the paint
    row.find("button").contains("delete").click();
  });

  it("shows the donor in the admin person with emails table", () => {
    cy.visit("http://localhost:5173/admin");
    cy.url().should("contain", "/login");
    cy.get("#email").type(SITE_ADMIN_EMAIL);
    cy.get("#password").type(SITE_ADMIN_PASSWORD);
    cy.get("button").click();
    // should go to admin page
    cy.url().should("equal", "/admin");
    cy.visit("http://localhost:5173/admin/persons-with-emails");
    const row = cy.get(`td [title=${testEmail1}`).parent();
    row.should("be.visible");
    //delete the donor PWE
    row.find("button").contains("delete").click();
  });
});
