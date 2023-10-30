class manageDncPage {

  get filterByDropdown() {
    return (cy.get('select[name="form[filterOption]"]'));
  }
  
  get uploadDNCbutton() {
    return (cy.get('a[href="/dnc/upload"]'));
  }

  get countryList() {
    return (cy.get('.panel-body>div.row select[name$="form[\'countryList\']"]'));
  }

  get campaignList() {
    return (cy.get('.panel-body>div.row select[name="form[\'campaignList\']"]'));
  }

  get phoneNumberInput() {
    return (cy.get('#number'));
  }

  get addButton() {
    return (cy.get('.col-sm-3 .btn.btn-success'));
  }

  get successmessage() {
    return (cy.get('div.note.note-success.ng-binding:contains(Added DNC number)'));
  }

  get campaignInput() {
    return (cy.get('.ng-isolate-scope > .form-control'));
  }

  get selectDNCCampaign() {
    return (cy.get('.selectize-dropdown-content'));
  }

  get searchButton() {
    return (cy.get('.btn.btn-success:contains("Search")'));
  }

  get numberTable() {
    return (cy.get('.table.table-striped tbody tr.ng-scope'));
  }
}
export default manageDncPage;