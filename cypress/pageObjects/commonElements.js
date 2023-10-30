class commonElementsPage {

    get warningModal() {
        return cy.get('#warningModal > .modal-dialog > .modal-content > .modal-footer > :nth-child(2)', { timeout: 10000 });
    }

    get pageTitle() {
        return (cy.title());
    }

    get userProfile() {
        return (cy.get('a.dropdown-toggle.user-menu.pointer span'));
    }

    get callCenterDropdown() {
        return (cy.get('a.dropdown-toggle.pointer  > span:contains("Call Center")'));
    }

    get dncInCallCenterDropDown() {
        return (cy.get('a[href="https://admin-dt.convoso.com/dnc/manage"]'));
    }
}

export default commonElementsPage;
