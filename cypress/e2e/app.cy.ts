import yesterdayGameData from '../../src/tests/yesterdayGameData';
import todayGameData from '../../src/tests/todayGameData';
import yesterdayGameBoxscoreData from '../../src/tests/yesterdayGameBoxscoreData';
import {
    boxscoreDataType,
    swiperElement,
} from '../../src/types/basketballdata';
import { compareBoxscoreData } from '../support/helperFunctions';

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
        cy.get('[class="score-card"]').first().click();
        cy.get('[class="boxscore-container"]').should('exist');
        cy.get('[class="boxscore-title"]')
            .first()
            .and('contain', yesterdayGameData.data[0].visitor_team.full_name);
        cy.scrollTo('bottom');
    });

    it('sucessfully move the carousel when clicked', () => {
        cy.visit('/');

        const carousel = cy.get('.swiper');

        let currentPosition: number;
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

    it('does not change boxscore when clicking today game with no data', () => {
        cy.visit('/');
        const scoreCards = cy.get('[class="score-card"]');
        scoreCards.first().click();
        cy.get('[class="boxscore-container"]').should('exist');
        cy.get('[class="boxscore-title"]')
            .first()
            .and('contain', yesterdayGameData.data[0].visitor_team.full_name);

        scoreCards.last().click();
    });

    it('away team boxscore data is correct', () => {
        cy.visit('/');
        const scoreCards = cy.get('[class="score-card"]');
        scoreCards.first().click();

        const boxScores = cy.get('.boxscore-table');
        boxScores.should('exist');
        const awayBoxscore = boxScores.first();

        // Expected Data
        const gameData = yesterdayGameBoxscoreData['game1'];
        const awayId = gameData.data[0].game.visitor_team_id;
        console.log('CALLING CUSTOM FUNCTIONS');
        compareBoxscoreData(awayBoxscore, awayId, gameData);
    });

    it('home team boxscore data is correct', () => {
        cy.visit('/');
        const scoreCards = cy.get('[class="score-card"]');
        scoreCards.first().click();

        const boxScores = cy.get('.boxscore-table');
        boxScores.should('exist');
        const homeBoxscore = boxScores.eq(1);

        // Expected Data
        const gameData = yesterdayGameBoxscoreData['game1'];
        const homeId = gameData.data[0].game.home_team_id;

        // compareBoxscoreData(homeBoxscore, homeId, gameData);
        compareBoxscoreData(homeBoxscore, homeId, gameData);
    });
});
