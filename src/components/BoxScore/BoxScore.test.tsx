import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import BoxScore from './BoxScore';

import testData from '../test_data/testData';
import { playerStatsDataType } from '../../types/basketballdata';

describe('BoxScore', () => {
    it('Renders BoxScore component', () => {
        // Arrange
        render(<BoxScore data={testData.boxscoreData} />);
        //Act
        //Expect
    });

    it('Renders BoxScore Proper Headers', () => {
        // Arrange
        render(<BoxScore data={testData.boxscoreData} />);
        //Act
        //Expect
        const role = screen.getAllByRole('columnheader');
        for (let i = 0; i < role.length; i++) {
            expect(role[i]).toHaveTextContent(boxscoreHeaders[i]);
        }
    });

    it('Renders BoxScore component', () => {
        // Arrange
        render(<BoxScore data={testData.boxscoreData} />);
        //Act
        //Expect
        // const role = screen.getAllByRole('colgroup');
        testData.boxscoreData.forEach((playerStats) => {
            const player = playerStats.player;
            const name = `${player.last_name}, ${player.first_name}`;
            const row = screen.getByText(name).closest('tr');

            if (row) {
                for (let i = 1; i < row.childElementCount; i++) {
                    const key = columns[i][
                        'accessor'
                    ] as keyof playerStatsDataType;
                    let expectedValue = playerStats[key];
                    if (columns[i].rate) {
                        const rate: number = playerStats[key] as number;
                        expectedValue = (rate * 100).toFixed(1);
                    }
                    expect(row?.children[i].textContent).toBe(
                        expectedValue.toString()
                    );
                }
            }

            // Object.entries(playerStats).forEach(([key, value], idx) => {
            //     console.log(key, value, idx);
            // });

            // const row = screen.getByText(playerStats.player.last_name);
            // console.log(row.textContent);
        });
    });
});

//////////////////////////////
// Mock Testing Data Answers//
//////////////////////////////
const boxscoreHeaders = [
    'Toronto',
    'MIN',
    'PTS',
    'FGM',
    'FGA',
    'FG%',
    '3PM',
    '3PA',
    '3P%',
    'FTM',
    'FTA',
    'FT%',
    'OR',
    'REB',
    'AST',
    'BLK',
    'STL',
    'TO',
    'PF',
];

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
