describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/give-away");

    cy.get('[data-testid="open-color-picker-btn"]').click();
    //click a color in the color pickder
    cy.get('[data-testid="pixel-B77"]').click();
    cy.get('[data-testid="textbox-name"]').type("testName");
    cy.get('[data-testid="select-brand"]').select("Behr");
    cy.get('[data-testid="select-quantity"]').select("less than a gallon");
    cy.get('[data-testid="textbox-email"]').type("alfons@hapsburg.net");
    cy.get('[data-testid="textbox-confirmEmail"]').type("alfons@hapsburg.net");
    cy.get('[data-testid="select-sheen"]').select("velvet");
    cy.get('[data-testid="textbox-zipCode"]').type("16801");
    cy.get("#save").click();

    //cy.get("#result").should("be.visible");
    //cy.get("h1").should("be.visible").should("have.text", "Hey, Thanks for making your paint available!");
    cy.url().should("contain", "/thank-you");
  });
});
