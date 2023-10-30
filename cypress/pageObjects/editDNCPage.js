class editDncPage {

    get phoneNumberInput() {
        return cy.get('input[type$="text"]');
    }

    get campaignDropDown() {
        return (cy.get(':nth-child(3) > .col-sm-3  > .form-control'))
    }

    get applyButton() {
        return (cy.get('button[type$="submit"]'))
    }
}

export default editDncPage;
