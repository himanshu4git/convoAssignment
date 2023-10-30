class loginPage{

   get username()
   {
       return cy.get("#username");
   }

   get password()
   {
       return cy.get("#password");
   }

   get submit()
   {
       return cy.get("input[type='submit']");
   }

}

export default loginPage;
