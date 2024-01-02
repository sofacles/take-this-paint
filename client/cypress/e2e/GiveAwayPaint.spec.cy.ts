const testName1 = "Sea88Condo";
const testEmail1 = "sofacles@yahoo.com";

describe("template spec", () => {
  it("posts a paint and goes to a thank you page", () => {
    cy.visit("http://localhost:5173/give-away");

    cy.get('[data-testid="open-color-picker-btn"]').click();
    //click a color in the color picker
    cy.get('[data-testid="pixel-B77"]').click();
    cy.get('[data-testid="textbox-name"]').type(testName1);
    cy.get('[data-testid="select-brand"]').select("Behr");
    cy.get('[data-testid="select-quantity"]').select("less than a gallon");
    cy.get('[data-testid="textbox-email"]').type(testEmail1);
    cy.get('[data-testid="textbox-confirmEmail"]').type(testEmail1);
    cy.get('[data-testid="select-sheen"]').select("velvet");
    cy.get('[data-testid="textbox-zipCode"]').type("16801");
    cy.get("#save").click();

    cy.url().should("contain", "/thank-you");
  });

  it("shows up in the admin paints table with email not confirmed", () => {
    cy.visit("http://localhost:5173/admin/paints");
    cy.url().should("contain", "/login");
    cy.get("#email").type(Cypress.env("loginEmail"));
    cy.get("#password").type(Cypress.env("loginPassword"));
    cy.get('button[data-testid="loginSubmit"]').click();
    // should go to admin page
    cy.url().should("contain", "/admin");
    cy.visit("http://localhost:5173/admin/paints");
    const nameCell = cy.get("td").contains(testName1);
    let rowFound = false;
    nameCell.should("be.visible");
    nameCell.parent().then(($selectedElement) => {
      const row = $selectedElement[0];
      for (let i = 0; i < row.children.length; i++) {
        if (row.children[i].childNodes[0].tagName === "BUTTON") {
          rowFound = true;
          cy.wrap(row.children[i].childNodes[0].click());
        }
      }
      cy.wrap(rowFound).should("be.true");
      cy.get("td").contains(testName1).should("not.exist");
    });

    //email confirmed should be false
  });
});
