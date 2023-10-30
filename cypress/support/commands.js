// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

/* This method takes user to DNC Manage Page*/
Cypress.Commands.add('navigateDNCManagePage', (commonElementsObj) => {
  Cypress.log({ name: 'CUSTOM - navigateDNCManagePage' });
  try {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  } catch (e) {
    // Handle any other error
  }
  commonElementsObj.callCenterDropdown.click({ force: true }).wait(500);
  commonElementsObj.dncInCallCenterDropDown.should('be.visible').click().wait(1000);
  commonElementsObj.pageTitle.should('eq', 'Manage DNC')
  Cypress.on('uncaught:exception', () => {
    return true; // Revert to the default behavior
  });
  
})

/* This method search numbers by specified campaign*/
Cypress.Commands.add('searchByFilter', (campaign) => {
  Cypress.log({ name: 'CUSTOM - searchByFilter' });
  cy.get('select[name="form[\'filterOption\']"]').select("Campaign")
  cy.get('input[placeholder=\'Click to select\']').click();
  cy.get('.selectize-input').type(campaign + "{enter}");
  cy.get('.btn.btn-success:contains("Search")').click().wait(2000);
})

/* This method search the edited number and its setting as Automation Campaign*/
Cypress.Commands.add('searchEditedNumber', (EditedNumber) => {
  Cypress.log({ name: 'CUSTOM - searchEditedNumber' });
  let foundEditedNumber = false;
  cy.get('table.table.table-striped tbody tr td:nth-child(2)').each(($numberColumn) => {
    cy.wrap($numberColumn).invoke('text').then((phoneNumber) => {
      if (phoneNumber.trim() === EditedNumber) {
        // Find the Campaign 
        cy.wrap($numberColumn).next('td').invoke('text').then((nextCellText) => {
          // Compare the text from the next cell with 'automation'
          expect(nextCellText.trim()).to.equal('Automation Campaign');
          foundEditedNumber = true;
        });
      }
    });
  }).then(() => {
    // Assert that the edited number was found
    expect(foundEditedNumber, 'Edited number is present with changed settings ').to.be.true;
  });
})

/* This method search the added number and provides their DNC IDs as well*/
Cypress.Commands.add('searchAndgetID', (manageDncObj) => {
  Cypress.log({ name: 'CUSTOM - searchAndgetID' });
  const phoneNumbers = [];
  const idTable = [];
  cy.readFile('cypress/fixtures/numbers.txt').then((numbersList) => {
    const numbersFromFile = numbersList.split('\n').map((line) => line.trim());
    // Read all numbers from the table and store them in an array
    cy.get('table.table.table-striped tbody tr td:nth-child(2)').each(($numberColumn) => {
      cy.wrap($numberColumn).invoke('text').then((phoneNumber) => {
        const trimmedPhoneNumber = phoneNumber.trim();
        if (trimmedPhoneNumber) {
          phoneNumbers.push(trimmedPhoneNumber);
          // Get the Id of added number
          cy.wrap($numberColumn).parent()
            .find('.btn-group.btn-group-xs').click({ force: true })
            .find('a[href]')
            .invoke('attr', 'href').then((text) => {
              const parts = text.split('/');
              const extractedPart = parts[2];
              //Add Id to table if it is added by our test
              if (numbersFromFile.includes(trimmedPhoneNumber)) {
                idTable.push(extractedPart);
              }
            });
        }
      });
    }).then(() => {
      // Now, we have all numbers in the 'phoneNumbers' array, and the corresponding IDs in 'idTable'
      // Now, let's add an assertion to check if all numbers from the file are present in the phoneNumbers list
      numbersFromFile.forEach((number) => {
        expect(phoneNumbers).to.include(number);
      });
    }).then(() => {
      return idTable;
    });
  });
});

/* This method provides list of given numbers */
Cypress.Commands.add('readNumbersFromFile', () => {
  return cy.readFile('cypress/fixtures/numbers.txt').then((numbersList) => {
    return numbersList.split('\n').map((line) => line.trim());
  });
});
