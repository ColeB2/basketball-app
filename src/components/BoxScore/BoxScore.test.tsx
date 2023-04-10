import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import BoxScore from './BoxScore';

import testData from '../../tests/testData';
import { playerStatsDataType } from '../../types/basketballdata';
import { columns } from './BoxScore';

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
        testData.boxscoreData.forEach((playerStats) => {
            const player = playerStats.player;
            const first = player.first_name.replace(/\b(\w)\w+/g, '$1.');
            const name = `${first} ${player.last_name}`;
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
