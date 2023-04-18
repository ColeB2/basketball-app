import yesterdayGameData from '../../src/tests/yesterdayGameData';
import { swiperElement } from '../../src/types/basketballdata';

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
        cy.get('[class="score-card"]').then(($elements) => {
            // Loop through data for games that have boxscores, then
            // check that the data returned matches up.
            for (let i = 0; i < yesterdayGameData.data.length; i++) {
                cy.wrap($elements[i]).click();
                const homeTeam = yesterdayGameData.data[i].home_team;
                const awayTeam = yesterdayGameData.data[i].visitor_team;
                cy.get('[class="boxscore-title"]').and(
                    'contain',
                    awayTeam.full_name
                );
                cy.get('[class="boxscore-title"]').and(
                    'contain',
                    homeTeam.full_name
                );
            }
        });
    });

    it('sucessfully move the carousel when clicked', () => {
        cy.visit('/');

        const carousel = cy.get('.swiper');

        let currentPosition;
        carousel.then(($el) => {
            currentPosition = ($el[0] as swiperElement).swiper.realIndex;
        });

        cy.get('.swiper-button-next').click();

        carousel.then(($el) => {
            expect(($el[0] as swiperElement).swiper.realIndex).to.not.equal(
                currentPosition
            );
        });
    });
    // });

    // it('sucessfully clicks a game that has no boxscore data', () => {
    //     cy.visit('/');
    //     // Main container page should exist.
    //     cy.get('[class="score-card"]').then(($elements) => {
    //         // Loop through data for games that have boxscores, then
    //         // check that the data returned matches up.
    //         for (let i = yesterdayGameData.data.length; i < 15; i++) {
    //             cy.wrap($elements[i]).click();
    //             cy.get('[class="boxscore-title"]').should('not.exist');
    //         }
    //     });
    // });
});
