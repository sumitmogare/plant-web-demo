/*
cy.get('input#ftsAutocomplete').invoke('val').then(pickUpLocation => {
    cy.get('input#dropFtsAutocomplete').should('have.value', pickUpLocation)
})
*/

context('Actions',() =>{
    beforeEach(() => {
        cy.visit('localhost:8089');
        cy.get('#txtUsername')
          .type('13334445556').should('have.value', '13334445556')
    
          cy.get('#txtPassword')
          .type('1').should('have.value', '1')

        cy.get('.mk-btn').click();

        cy.url()
            .should('include', '/#/app-asset-hierarchy');

    })

    //click on edit row icon should open edit window with all values entered.
    it('click on edit details to open edit window', () => {
        cy.pause();
        var name = cy.get('.mk-datagrid').find('a.assetOverviewLink').first().get('value');
        console.log('name : ', name);
        cy.get('.mk-datagrid').find('i.anticon-edit').first().click();
       //cy.get('.anticon-edit').first().click();
    })

    //click on asset name link to navigate to asset overview page.
    it('click on asset name link to navigate to asset overview' , () => {
      
        cy.get('.assetOverviewLink').first().click();

        cy.url().should('include','/#/app-asset-overview');

        cy.get('.ant-tabs-tab').first().next().click();

        cy.get('.mk-app-asset-overview-name').contains('Press Shop 1');
        //cy.pause()
    })

    it('find and click add node button', () => {
       // cy.visit('localhost:8089/#/app-asset-hierarchy');
        cy.get('button[path="root.children.left.extra.header.children.add"]').click();

        cy.get('.mk-app-asset-hierarchy-type-form');

        cy.get('.ant-btn-primary').click();
        cy.get('.has-error')
      })

      //deselect asset tree root node and click on add button should show error message.
      it('click on asset tree root node',() => {
      //  cy.visit('localhost:8089/#/app-asset-hierarchy');
        // deselect the root node by clicking on it.
        cy.get('.ant-tree-title').click();

        // click on add node button
        cy.get('button[path="root.children.left.extra.header.children.add"]').click();

        // should display error message.
        cy.get('.ant-message-notice');
      })

      //selecting asset tree node and clicking add button and adding child node should add child node under selected node.
      it('select node and add a child node under it',() => {
       // cy.visit('localhost:8089/#/app-asset-hierarchy');

        // expand asset tree root node
        cy.get('.ant-tree-switcher_close').click();

        // expand asset tree first child node
        cy.get('.ant-tree-child-tree-open')
          .children('li').first().children('.ant-tree-switcher_close').click();
        
        // select first child node from the expanded tree.
        cy.get('.ant-tree-child-tree-open').last()
        .children('li').first().children('span[title="Line 1"]').click();

        // add new node under this selected child node.
        cy.get('button[path="root.children.left.extra.header.children.add"]').click();

        // find code field and enter 12354 value in it
        cy.get('input[path="root.children.form.children.codeItem.children.code"]')
            .type('12354').should('have.value','12354');

        // find name field and enter Test Node in it.
        cy.get('input[path="root.children.form.children.nameItem.children.name"]')
        .type('Test Node').should('have.value','Test Node');

        // click on save button
        cy.get('.ant-btn-primary').click();

        // expand current node in tree.
        //cy.pause();
        cy.get('.ant-tree-child-tree-open')
        .children('li').first().children('ul')
        .children('li').first().children('.ant-tree-switcher_close').click().parent('li')
        .children('ul').children('li').last().children('span').last().should('have.attr','title','Test Node')
      })

      //add child node to last node of the asset tree.
      it('select node and add a child node under it',() => {
        // expand asset tree root node
        cy.get('.ant-tree-switcher_close').click();

         // expand asset tree last child node
         cy.get('.ant-tree-child-tree-open')
         .children('li').last().children('.ant-tree-node-content-wrapper').click();

         // add new node under this selected child node.
         cy.get('button[path="root.children.left.extra.header.children.add"]').click();

         // find code field and enter 12354 value in it
         cy.get('input[path="root.children.form.children.codeItem.children.code"]')
             .type('12354').should('have.value','12354');
 
         // find name field and enter Test Node in it.
         cy.get('input[path="root.children.form.children.nameItem.children.name"]')
         .type('Test Node').should('have.value','Test Node');
 
         // click on save button
         cy.get('.ant-btn-primary').click();
 
    })

    
})