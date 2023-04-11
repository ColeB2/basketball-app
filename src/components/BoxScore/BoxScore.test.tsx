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
        // Check intiial role is teams city value.
        expect(role[0]).toHaveTextContent(testData.boxscoreData[0].team.city);
        // Loop to check the headers of our boxscore are proper columns.
        for (let i = 1; i < role.length; i++) {
            expect(role[i]).toHaveTextContent(columns[i].label);
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
