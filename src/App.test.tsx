import { describe, expectTypeOf } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import todayGameData from './tests/todayGameData';
import yesterdayGameData from './tests/yesterdayGameData';
import todayGameBoxscoreData from './tests/todayGameBoxscoreData';
import { minutesSort } from './helpers/helperFunctions';
import { columns } from './components/BoxScore/BoxScore';

import App from './App';

describe('App', () => {
    it('Renders App component', async () => {
        render(<App />);

        await screen.findAllByRole('table');
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        expect(tables.length).toBe(15);
    });
    it('Renders Tables/Games Properly', async () => {
        render(<App />);

        await screen.findAllByRole('table');

        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        expect(tables.length).toBe(15);

        for (let i = 0; i <= yesterdayGameData.data.length - 1; i++) {
            const table = tables[i];
            // Assert first row of each table is Status --> Final
            const rows = table.querySelectorAll('tr');
            expect(rows[0].textContent).toBe('Final');
            const awayCells = rows[1].querySelectorAll('td');
            const homeCells = rows[2].querySelectorAll('td');
            const [, awayAbbr, awayScore] = awayCells;
            const [, homeAbbr, homeScore] = homeCells;
            expect(awayAbbr.textContent).toBe(
                yesterdayGameData.data[i].visitor_team.abbreviation
            );
            expect(awayScore.textContent).toBe(
                yesterdayGameData.data[i].visitor_team_score.toString()
            );
            expect(homeAbbr.textContent).toBe(
                yesterdayGameData.data[i].home_team.abbreviation
            );
            expect(homeScore.textContent).toBe(
                yesterdayGameData.data[i].home_team_score.toString()
            );
        }
    });
    it('Renders Boxscore when clicking today game table.', async () => {
        render(<App />);

        await screen.findAllByRole('table');
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        fireEvent.click(tables[0]);
        // Click on tables and wait for the other boxscores tables to load.
        await waitFor(() =>
            expect(screen.getAllByRole('table').length).toBeGreaterThan(
                tables.length
            )
        );
    });
    it('Renderered away team boxscore data is correct', async () => {
        render(<App />);

        await screen.findAllByRole('table');
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        fireEvent.click(tables[0]);
        // Click on tables and wait for the other boxscores tables to load.
        await waitFor(() =>
            expect(screen.getAllByRole('table').length).toBeGreaterThan(
                tables.length
            )
        );
        const tablesPostClick = screen.getAllByRole('table');
        const awayTeamBoxscore = tablesPostClick[tablesPostClick.length - 2];
        const awayTeam = awayTeamBoxscore.querySelectorAll('tr');
        const gameData = todayGameBoxscoreData['game1'];
        const awayId = gameData.data[0].game.visitor_team_id;
        //Get Data based of id
        const awayData = gameData.data.filter(
            (player) => player.team.id === awayId
        );

        awayData.sort(minutesSort);

        // Test Away Data:
        for (let i = 1; i < awayTeam.length; i++) {
            const player = awayTeam[i];
            const statline = player.querySelectorAll('td');
            for (let j = 1; j < statline.length; j++) {
                const accessor = columns[j].accessor;
                let stat = awayData[i - 1][accessor];
                if (
                    (typeof stat === 'string' || typeof stat === 'number') &&
                    columns[j].rate
                ) {
                    let rate = parseFloat(String(stat));
                    rate *= 100;
                    stat = rate.toFixed(1);
                }

                expect(statline[j].textContent).toBe(String(stat));
            }
        }
    });
    it('Renderered home team boxscore data is correct', async () => {
        render(<App />);

        await screen.findAllByRole('table');
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        fireEvent.click(tables[0]);
        // Click on tables and wait for the other boxscores tables to load.
        await waitFor(() =>
            expect(screen.getAllByRole('table').length).toBeGreaterThan(
                tables.length
            )
        );
        const tablesPostClick = screen.getAllByRole('table');
        const homeTeamBoxscore = tablesPostClick[tablesPostClick.length - 1];
        const homeTeam = homeTeamBoxscore.querySelectorAll('tr');
        const gameData = todayGameBoxscoreData['game1'];
        const homeId = gameData.data[0].game.home_team_id;
        //Get Data based of id
        const homeData = gameData.data.filter(
            (player) => player.team.id === homeId
        );

        homeData.sort(minutesSort);

        // Test Away Data:
        for (let i = 1; i < homeTeam.length; i++) {
            const player = homeTeam[i];
            const statline = player.querySelectorAll('td');
            for (let j = 1; j < statline.length; j++) {
                const accessor = columns[j].accessor;
                let stat = homeData[i - 1][accessor];
                if (
                    (typeof stat === 'string' || typeof stat === 'number') &&
                    columns[j].rate
                ) {
                    let rate = parseFloat(String(stat));
                    rate *= 100;
                    stat = rate.toFixed(1);
                }

                expect(statline[j].textContent).toBe(String(stat));
            }
        }
    });
});
