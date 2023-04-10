import { describe } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import todayGameData from './tests/todayGameData';
import yesterdayGameData from './tests/yesterdayGameData';
import todayGameBoxscoreData from './tests/todayGameBoxscoreData';
import { minutesSort } from './helpers/helperFunctions';
import { columns } from './components/BoxScore/BoxScore';
import { daysList, monthsList } from './components/DateCard/DateCard';

import App from './App';

describe('App', () => {
    it('Renders App component', async () => {
        render(<App />);

        await screen.findAllByRole('table');
        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        const expectedTableLength =
            yesterdayGameData.data.length + todayGameData.data.length + 1;
        expect(tables.length).toBe(expectedTableLength);
    });
    it('Renders Tables/Games Properly', async () => {
        render(<App />);

        await screen.findAllByRole('table');

        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        const expectedTableLength =
            yesterdayGameData.data.length + todayGameData.data.length + 1;
        expect(tables.length).toBe(expectedTableLength);

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
    it('Renders date card properly', async () => {
        render(<App />);

        await screen.findAllByRole('table');

        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        const expectedTableLength =
            yesterdayGameData.data.length + todayGameData.data.length + 1;
        expect(tables.length).toBe(expectedTableLength);
        const dateIndex = yesterdayGameData.data.length;
        const table = tables[dateIndex];

        const today = new Date();
        const todayMonth = monthsList[today.getMonth()];
        const todayDay = daysList[today.getDay()];
        const expectedDate = `${todayDay}${todayMonth} ${today.getDate()}`;
        const expectedMonthDate = `${todayMonth} ${today.getDate()}`;
        expect(table.textContent).toBe(expectedDate);

        // Assert first row of each table is Status --> Final
        const rows = table.querySelectorAll('tr');
        const currentDay = rows[0].querySelector('td');
        const currentMonthDate = rows[1].querySelector('td');
        // const [currentDayRow, currentMonthDateRow] = rows;
        expect(currentDay?.textContent).toBe(todayDay);
        expect(currentMonthDate?.textContent).toBe(expectedMonthDate);
    });
    it('Renders Today Games Properly', async () => {
        render(<App />);

        await screen.findAllByRole('table');

        const tables = screen.getAllByRole('table');
        // After loading we should have 15 tables;
        // 4 today games, 1 date table/ 10 tomorrow games.
        const expectedTableLength =
            yesterdayGameData.data.length + todayGameData.data.length + 1;
        expect(tables.length).toBe(expectedTableLength);

        for (
            let i = yesterdayGameData.data.length + 1;
            i < expectedTableLength;
            i++
        ) {
            const table = tables[i];
            // Assert first row of each table is Status --> XX:XX PM ET
            const rows = table.querySelectorAll('tr');
            const dataIndex = i - yesterdayGameData.data.length - 1;
            const expectedStatus = todayGameData.data[dataIndex].status;
            const status = rows[0].textContent;
            expect(status).toBe(expectedStatus);
            // Tests the away/home teams ABBR and initial score is correct.
            const awayCells = rows[1].querySelectorAll('td');
            const homeCells = rows[2].querySelectorAll('td');
            const [, awayAbbr, awayScore] = awayCells;
            const [, homeAbbr, homeScore] = homeCells;
            expect(awayAbbr.textContent).toBe(
                todayGameData.data[dataIndex].visitor_team.abbreviation
            );
            expect(awayScore.textContent).toBe(
                todayGameData.data[dataIndex].visitor_team_score.toString()
            );
            expect(homeAbbr.textContent).toBe(
                todayGameData.data[dataIndex].home_team.abbreviation
            );
            expect(homeScore.textContent).toBe(
                todayGameData.data[dataIndex].home_team_score.toString()
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
        // Process the data to how it should appear in the table.
        const homeData = gameData.data.filter(
            (player) => player.team.id === homeId
        );
        homeData.sort(minutesSort);

        // Test Data:
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
    it('Renderered boxscore data changes when clicking different game', async () => {
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
        // Get initial team for home/away boxscore.
        let homeTeamName = yesterdayGameData.data[0].home_team.full_name;
        let awayTeamName = yesterdayGameData.data[0].visitor_team.full_name;
        let currentHomeBoxscoreTitle = screen.getByRole('heading', {
            name: homeTeamName,
        }).textContent;
        let currentAwayBoxscoreTitle = screen.getByRole('heading', {
            name: awayTeamName,
        }).textContent;
        console.log(currentHomeBoxscoreTitle);

        // Click another table and check that data changes
        for (let i = 1; i < yesterdayGameData.data.length; i++) {
            fireEvent.click(tables[i]);
            console.log('before', i, currentHomeBoxscoreTitle);
            await waitFor(() => {
                const teamNameChange =
                    yesterdayGameData.data[i].home_team.full_name;
                console.log(teamNameChange, currentHomeBoxscoreTitle);
                screen.getByRole('heading', { name: teamNameChange });
            });
            console.log(i, currentHomeBoxscoreTitle);
            const newHomeTeamName =
                yesterdayGameData.data[i].home_team.full_name;
            const newAwayTeamName =
                yesterdayGameData.data[i].visitor_team.full_name;
            const newHomeBoxscoreTitle = screen.getByRole('heading', {
                name: newHomeTeamName,
            }).textContent;
            const newAwayBoxscoreTitle = screen.getByRole('heading', {
                name: newAwayTeamName,
            }).textContent;
            console.log(i, newHomeBoxscoreTitle, currentHomeBoxscoreTitle);
            expect(newHomeBoxscoreTitle).not.toBe(currentHomeBoxscoreTitle);
            expect(newAwayBoxscoreTitle).not.toBe(currentAwayBoxscoreTitle);
            awayTeamName = newAwayTeamName;
            homeTeamName = newHomeTeamName;
            currentHomeBoxscoreTitle = newHomeBoxscoreTitle;
            currentAwayBoxscoreTitle = newAwayBoxscoreTitle;
        }
    });
});
