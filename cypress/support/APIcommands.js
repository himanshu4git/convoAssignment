const deleteUrl = 'https://admin-dt.convoso.com/dnc/';
Cypress.Commands.add('deleteNumbers', (idToDelete) => {
  Cypress.log({name: 'CUSTOM - DeleteNumbers'});
    const requestOptions = {
      method: 'DELETE',
      url: deleteUrl+idToDelete+'/delete?id='+idToDelete, 
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
      },
    };
    cy.request(requestOptions).then((deleteResponse) => {
      expect(deleteResponse.status).to.equal(200);
      // Assert the 'text' in the response body is 'DNC deleted!'
      expect(deleteResponse.body.text).to.equal('DNC deleted!');
  });
});
