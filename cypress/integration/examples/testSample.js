// describe('myFirstTest',function(){
//     it('Visit mk-demo',function(){
//         cy.visit("localhost:8089");
//         cy.get('#txtUsername').type('13334445556');
//         cy.get('#txtPassword').type('1');
//         cy.get('.mk-btn').click();
//         cy.url().should('include','/#/app-asset-hierarchy');
//         //  1
//     })
// })


context('Actions', () => {
    beforeEach(() => {
      cy.visit('localhost:8089')
    })

    it('.type() - type into a DOM element', () => {
        // https://on.cypress.io/type
        cy.get('#txtUsername')
          .type('13334445556').should('have.value', '13334445556')
    
          cy.get('#txtPassword')
          .type('1').should('have.value', '1')

        cy.get('.mk-btn').click();

        cy.url()
            .should('include', '/#/app-asset-hierarchy');
          // .type() with special character sequences
         // .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
         // .type('{del}{selectall}{backspace}')
    
          // .type() with key modifiers
        //  .type('{alt}{option}') //these are equivalent
        //  .type('{ctrl}{control}') //these are equivalent
         // .type('{meta}{command}{cmd}') //these are equivalent
         // .type('{shift}')
    
          // Delay each keypress by 0.1 sec
         // .type('slow.typing@email.com', { delay: 100 })
        //  .should('have.value', 'slow.typing@email.com')
    
      //  cy.get('.action-disabled')
          // Ignore error checking prior to type
          // like whether the input is visible or disabled
        //  .type('disabled error checking', { force: true })
        //  .should('have.value', 'disabled error checking')
      })

      it('.click() - click on register link', () => {
        // https://on.cypress.io/type
       cy.get('.forgotPwdLink').click();
       cy.url()
       .should('include','/#/forgot-password')
      })

      it('.click() - click on a DOM element', () => {
          // register link click
        cy.get('a[path="root.children.content.children.form.children.item6.children.register"]').click();
      })
      
      it('.type() - type into a DOM element', () => {
        // https://on.cypress.io/type
        cy.get('#txtUsername')
          .type('13334445556').should('have.value', '13334445556')
    
          cy.get('#txtPassword')
          .type('12').should('have.value', '12')

        cy.get('.mk-btn').click();
      //  cy.get('.ant-message').children('span')
      //  .should('have.value','Please enter the correct username and password (system built-in user user: 13334445556, pwd: 1)');
        
        //.should('have.value','Please enter the correct username and password (system built-in user user: 13334445556, pwd: 1)');

      
      })

      

     
    })