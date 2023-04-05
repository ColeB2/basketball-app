import { describe, expectTypeOf } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import todayGameData from './tests/todayGameData';
import yesterdayGameData from './tests/yesterdayGameData';
import todayGameBoxscoreData from './tests/todayGameBoxscoreData';
import { minutesSort } from './helpers/helperFunctions';

import App from './App';

const columns = [
    {
        label: 'First',
        accessor: 'first_name',
        accessor2: 'last_name',
        player: true,
    },
    // {label: "Last", accessor: "last_name", player: true},
    { label: 'MIN', accessor: 'min' },
    { label: 'PTS', accessor: 'pts' },
    { label: 'FGM', accessor: 'fgm' },
    { label: 'FGA', accessor: 'fga' },
    { label: 'FG%', accessor: 'fg_pct', rate: true },
    { label: '3PM', accessor: 'fg3m' },
    { label: '3PA', accessor: 'fg3a' },
    { label: '3P%', accessor: 'fg3_pct', rate: true },
    { label: 'FTM', accessor: 'ftm' },
    { label: 'FTA', accessor: 'fta' },
    { label: 'FT%', accessor: 'ft_pct', rate: true },
    { label: 'OR', accessor: 'oreb' },
    { label: 'REB', accessor: 'reb' },
    { label: 'AST', accessor: 'ast' },
    { label: 'BLK', accessor: 'blk' },
    { label: 'STL', accessor: 'stl' },
    { label: 'TO', accessor: 'turnover' },
    { label: 'PF', accessor: 'pf' },
];

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
    it('Renderered boxscore data is correct', async () => {
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
        const homeTeamBoxscore = tablesPostClick[tablesPostClick.length - 1];
        // console.log(awayTeamBoxscore.textContent);
        const awayTeam = awayTeamBoxscore.querySelectorAll('tr');
        console.log('away team', awayTeam);
        const gameData = todayGameBoxscoreData['game1'];
        const awayId = gameData.data[0].game.visitor_team_id;
        const homeId = gameData.data[0].game.home_team_id;
        //Get Data based of id
        // console.log(gameData.data);
        const awayData = gameData.data.filter(
            (player) => player.team.id === awayId
        );
        const homeData = gameData.data.filter(
            (player) => player.team.id === homeId
        );

        awayData.sort(minutesSort);
        homeData.sort(minutesSort);

        // Test Away Data:
        for (let i = 1; i < awayTeam.length; i++) {
            const player = awayTeam[i];
            console.log('stuff', player.textContent);
            const statline = player.querySelectorAll('td');
            for (let j = 1; j < statline.length; j++) {
                // console.log(columns[j].accessor, statline[j].textContent);
                const accessor = columns[j].accessor;
                let stat = awayData[i - 1][accessor]
                if (columns[j].rate) {
                    stat *= 100;
                    stat = stat.toFixed(1);
                }
                // console.log(i, j, accessor, statline[j].textContent, awayData[j-1]);
                expect(statline[j].textContent).toBe(stat.toString());

                // for (let k = 1; k < columns.length; k++) {
                //     console.log(columns[k]);
                // }
            }
        }
        // console.log(awayData[0]['blk']);
        // console.log('HERE', todayGameBoxscoreData[0]);
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
