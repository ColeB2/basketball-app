describe('The Main Page', () => {
    it('sucessfully loads page', () => {
        cy.visit('/');
        // Main container page should exist.
        cy.get('[class="container"]').should('exist');
    });

    it('sucessfully changes light-dark-light', () => {
        cy.visit('/');
        // Main container page should exist.
        cy.get('body').should(
            'have.css',
            'background-color',
            'rgb(255, 255, 255)'
        );
        cy.get('[class="button-image"]').click();
        cy.get('body').should('have.css', 'background-color', 'rgb(0, 0, 0)');
        cy.get('[class="button-image"]').click();
        cy.get('body').should(
            'have.css',
            'background-color',
            'rgb(255, 255, 255)'
        );
    });

    it('sucessfully clicks a game', () => {
        cy.visit('/');
        // Main container page should exist.
        cy.get('[class="score-card"]').first().click();
        cy.get('[class="boxscore-container"]').should('exist');
        cy.get('[class="boxscore-title"]')
            .first()
            .and('contain', 'Cleveland Cavaliers');
        cy.scrollTo('bottom');
    });

    it('sucessfully clicks all games and changes boxscore', () => {
        cy.visit('/');
        // Main container page should exist.
        // cy.get('[class="score-card"]').then(($element) => {
        //     $element.slice(0, 2).each(($el, index, $list) => {
        //         cy.wrap($el).click();
        //     });
        // });
        // cy.request('https://www.balldontlie.io/api/v1/games').then(
        //     (response) => {
        //         const apiData = response.body;
        //         console.log(apiData);
        //     }
        // );
        cy.get('[class="score-card"]').then(($elements) => {
            for (let i = 0; i < 4; i++) {
                cy.wrap($elements[i]).click();
            }
        });
    });
});
