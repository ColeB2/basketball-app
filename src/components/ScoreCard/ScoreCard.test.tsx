import { describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import ScoreCard from './ScoreCard';
import testData from '../../tests/testData';

describe('ScoreCard', () => {
    it('Renders ScoreCard component', () => {
        // Arrange
        // const item = { id: 1 };
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={testData.basketballTestData.id}
                handleClick={() => handleClick()}
                {...testData.basketballTestData}
            />
        );
        // Act
        // Expect
        const tableRole = screen.getByRole('table');
        // tableRole textContent returns:
        // 'FinalGolden State WarriorsGSW126Toronto RaptorsTOR110'
        expect(tableRole).toHaveTextContent('Final');
        expect(tableRole).toHaveTextContent('GSW126');
        expect(tableRole).toHaveTextContent('TOR110');
    });

    it('Render ScoreCard components renders header: status', () => {
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={testData.basketballTestData.id}
                handleClick={() => handleClick()}
                {...testData.basketballTestData}
            />
        );
        const colHeader = screen.getByRole('columnheader');
        expect(colHeader).toHaveTextContent('Final');
    });

    it('Render ScoreCard components renders header: time', () => {
        testData.basketballTestData.time = '7:00 ET';
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={testData.basketballTestData.id}
                handleClick={() => handleClick()}
                {...testData.basketballTestData}
            />
        );
        const colHeader = screen.getByRole('columnheader');
        expect(colHeader).toHaveTextContent('7:00 ET');
        //Return item back to normal state
        testData.basketballTestData.time = 'Final';
    });

    it('ScoreCard renders cells properly', () => {
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={testData.basketballTestData.id}
                handleClick={() => handleClick()}
                {...testData.basketballTestData}
            />
        );
        const cellContent = [
            // Golden State Warriors --> name of svg image
            'Golden State Warriors',
            'GSW',
            '126',
            // Toronto Raptors --> name of svg image
            'Toronto Raptors',
            'TOR',
            '110',
        ];
        const colHeader = screen.getAllByRole('cell');
        for (let i = 0; i < colHeader.length; i++) {
            expect(colHeader[i]).toHaveTextContent(cellContent[i]);
        }
    });
    it('ScoreCard calls handleClick function on click', () => {
        const handleClick = vi.fn();
        render(
            <ScoreCard
                key={testData.basketballTestData.id}
                handleClick={() => handleClick()}
                {...testData.basketballTestData}
            />
        );
        const tableRole = screen.getByRole('table');
        fireEvent.click(tableRole);
        expect(handleClick).toHaveBeenCalled();
        fireEvent.click(tableRole);
        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});
