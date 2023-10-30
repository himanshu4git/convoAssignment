/// <reference types="cypress" />
import commonElementsPage from '../pageObjects/commonElements';
import loginPage from '../pageObjects/loginPage';
import manageDncPage from '../pageObjects/manageDncPage';
import editDncPage from '../pageObjects/editDNCPage';
import '../support/APIcommands.js'
describe('DNC Test Suite', () => {
let idTable;
    after(() => {
        idTable.forEach((id) => {
          cy.deleteNumbers(id);
          });
        })
  it('verify user can Add, Edit and Aelete DNC numbers', () => {
    const loginObj = new loginPage();
    const commonElementsObj = new commonElementsPage();
    const manageDncObj = new manageDncPage();
    const editDncObj = new editDncPage();
    //Handle exception exception once  while visiting URL (FS not defined)
    cy.once('uncaught:exception', (err, runnable) => {
        console.log("error", err)
        return false
        });
    //WIP: Replace base url to a var from env    
    cy.visit("https://admin-dt.convoso.com", { failOnStatusCode: false });
    cy.fixture('credentials').then(function(credentials){
      loginObj.username.type(credentials.username);
      loginObj.password.type(credentials.password);
      loginObj.submit.click();
      //Wait till warning modal is appeared else it will pop up later and hide other elements
      commonElementsObj.warningModal.should('be.visible').click({ force: true });
      //Assert user is logged in succesfully
      commonElementsObj.pageTitle.should('eq', 'Dashboard')
      commonElementsObj.userProfile.invoke('text').then((text) => {
          expect(text).includes(credentials.username);
          });
      // Naviagate to DNC Page from Call center dropdown and assert DNC upload page
      cy.navigateDNCManagePage(commonElementsObj);
      manageDncObj.uploadDNCbutton.click();
      cy.readNumbersFromFile().then((numbers) => {
      // Add each number to DNC and check if it is added successfully
      numbers.forEach((number) => {
          manageDncObj.countryList.select("number:1");
          console.log(`AddingDNC number ${number} to Global DNC List`);
          manageDncObj.campaignList.select('');
          manageDncObj.phoneNumberInput.clear().type('{selectall}' + number, { force: true }).wait(500).click();
          manageDncObj.addButton.click();
          console.log(manageDncObj.successmessage);
          cy.log(`Added DNC number ${number} to Global DNC List`);
          manageDncObj.successmessage.should('be.visible')
            .should('contain', `Added DNC number ${number} to Global DNC List`);
        });
      });
      //Move back DNC page and search for these numbers
      cy.navigateDNCManagePage(commonElementsObj);
      //filter numbers for Global Campaign
      cy.searchByFilter("Global");
      //Check if all numbers have been added successfully
      //Search numbers and store DNC Id for each added number in idtable
      cy.searchAndgetID(manageDncObj).then((table) => {
        idTable = table;
        cy.log('Captured idTable: ', idTable);
      });
      //Click on "Edit" penultimate number from the list
      var prefillednumber;
      var numbertoEdit = '8884567777';
      manageDncObj.numberTable.eq(-2).as('secondLastRow');
      cy.get(('@secondLastRow')).find('td:nth-child(2)').invoke('text').then((text) => {
         prefillednumber = text.trim();
        cy.get('@secondLastRow').find('.btn-group.btn-group-xs').click()
        .find('li:contains("Edit")').click(); // Find the "Edit" option and click 
      //Change number  to 8884567777. assign number to Automation Campaign
      editDncObj.phoneNumberInput.should('have.value', prefillednumber);
      editDncObj.phoneNumberInput.clear().type(numbertoEdit);
      editDncObj.campaignDropDown.select('Automation Campaign');
      editDncObj.applyButton.click();
    })  
     //Check if edit was successfull
     //wait till error modal pop up and assert its absence
     cy.wait(2000);
     cy.get('h4.modal-title.text-white.ng-binding').should('not.be.visible');

     //Move back to DNC manage page and filter for Automation Campaign
     cy.navigateDNCManagePage(commonElementsObj);
     cy.searchByFilter("Auto");

     //Check the number can be found and setting has been changed
     cy.searchEditedNumber(numbertoEdit);
    })
  });
});
