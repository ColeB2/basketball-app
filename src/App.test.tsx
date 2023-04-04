import { describe, expectTypeOf } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import todayGameData from './tests/todayGameData';
import yesterdayGameData from './tests/yesterdayGameData';

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

        for (let i = 0; i <= tableDataToday.length - 1; i++) {
            const table = tables[i];
            // //Below DOESNT WORK FIX>
            // const [awayTeamName, awayAbbr, awayScore] =
            //     table.querySelectorAll('tr:nth-child(2) td');
            // const [homeTeamName, homeAbbr, homeScore] =
            //     table.querySelectorAll('tr:nth-child(3) td');

            // expect(awayTeamName).toHaveTextContent(
            //     yesterdayGameData.data[i].visitor_team.full_name
            // );
            // expect(awayAbbr).toHaveTextContent(
            //     yesterdayGameData.data[i].visitor_team.abbreviation
            // );
            // expect(awayScore).toHaveTextContent(
            //     yesterdayGameData.data[i].visitor_team_score.toString()
            // );

            // expect(homeTeamName).toHaveTextContent(
            //     yesterdayGameData.data[i].home_team.full_name
            // );
            // expect(homeAbbr).toHaveTextContent(
            //     yesterdayGameData.data[i].home_team.abbreviation
            // );
            // expect(homeScore).toHaveTextContent(
            //     yesterdayGameData.data[i].home_team_score.toString()
            // );
            // Assert first row of each table is Status --> Final
            const rows = table.querySelectorAll('tr');
            expect(rows[0].textContent).toBe('Final');
            const awayCells = rows[1].querySelectorAll('td');
            const [awayTeamName, awayAbbr, awayScore] = awayCells;
            expect(awayTeamName.textContent).toBe(
                yesterdayGameData.data[i].visitor_team.full_name
            );
            expect(awayAbbr.textContent).toBe(
                yesterdayGameData.data[i].visitor_team.abbreviation
            );
            expect(awayScore.textContent).toBe(
                yesterdayGameData.data[i].visitor_team_score.toString()
            );
            const homeCells = rows[2].querySelectorAll('td');
            const [homeTeamName, homeAbbr, homeScore] = homeCells;
            expect(homeTeamName.textContent).toBe(
                yesterdayGameData.data[i].home_team.full_name
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

        await waitFor(() => screen.getByText('CLE'));
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
        const tables2 = screen.getAllByRole('table');
        // console.log(tables.length, tables2.length);
        // console.log(tables2[tables2.length - 1].textContent);
        // const boxscore = screen.getByText('Garland');
        // expect(tables.length).toBe(15);

        // for (let i = 0; i <= tableDataToday.length - 1; i++) {
        //     const table = tables[i];
        //     expect(table).toHaveTextContent(tableDataToday[i]);
        // }
    });
});

const tableDataToday: string[] = [
    'FinalCleveland CavaliersCLE116Brooklyn NetsBKN114',
    'FinalNew York KnicksNYK106Orlando MagicORL111',
    'FinalOklahoma City ThunderOKC105Los Angeles ClippersLAC127',
    'FinalCharlotte HornetsCHA96New Orleans Pelicans NOP115',
];

const tableDataTomo: string[] = [
    '10:30 PM ETOklahoma City ThunderOKC0Los Angeles LakersLAL0',
    '10:00 PM ETChicago BullsCHI0Portland Trail BlazersPOR0',
    '10:00 PM ETPhoenix SunsPHX0Sacramento KingsSAC0',
    '7:00 PM ETSan Antonio Spurs SAS0Washington WizardsWAS0',
    '7:00 PM ETIndiana PacersIND0Boston CelticsBOS0',
    '8:30 PM ETCharlotte HornetsCHA0Dallas MavericksDAL0',
    '7:30 PM ETDetroit PistonsDET0Toronto RaptorsTOR0',
    '9:00 PM ETMilwaukee BucksMIL0Utah JazzUTA0',
    '8:00 PM ETHouston RocketsHOU0Memphis GrizzliesMEM0',
    '10:00 PM ETPhiladelphia 76ersPHI0Golden State WarriorsGSW0',
    '10:30 PM ETOklahoma City ThunderOKC0Los Angeles LakersLAL0',
];
