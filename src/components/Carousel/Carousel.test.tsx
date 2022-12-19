import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Carousel from './Carousel';
import testData from '../test_data/testData';

describe('Carousel', () => {
    it('Renders Carousel component: render inside ScoreCards', () => {
        // Arrange
        const handleClick = () => undefined;
        render(
            <Carousel
                key={1}
                data={[testData.basketballTestData]}
                meta={{}}
                handleClick={handleClick}
            />
        );
        // Act
        // Expect
        // Same as ScoreCard tests --> empty container
        // That renders a bunch of ScoreCards/DateCards
        const tableRole = screen.getByRole('table');
        // tableRole textContent returns:
        // 'FinalGoldenState WarriorsGSW126Toronto RaptorsTOR110'
        expect(tableRole).toHaveTextContent('Final');
        expect(tableRole).toHaveTextContent('GSW126');
        expect(tableRole).toHaveTextContent('TOR110');
    });

    it('Carousel renders DateCard content inside', () => {
        // Arrange
        const handleClick = () => undefined;
        render(
            <Carousel
                key={1}
                data={[testData.testDateObj]}
                meta={{}}
                handleClick={handleClick}
            />
        );
        // Act
        // Expect

        const tableRole = screen.getByRole('table');
        // tableRole textContent returns:
        // row 1: 'SAT' row2: 'DEC 17'
        expect(tableRole).toHaveTextContent('SAT');
        expect(tableRole).toHaveTextContent('DEC');
        expect(tableRole).toHaveTextContent('17');
    });

    it('Carousel renders both ScoreCard and DateCard', () => {
        // Arrange
        const handleClick = () => undefined;
        render(
            <Carousel
                key={1}
                data={[testData.basketballTestData, testData.testDateObj]}
                meta={{}}
                handleClick={handleClick}
            />
        );
        // Act
        // Expect
        const tableRole = screen.getAllByRole('table');
        // tableRole 0: 'FinalGoldenState WarriorsGSW126Toronto RaptorsTOR110'
        // tableRole 1: SAT DEC 17
        expect(tableRole[0]).toHaveTextContent('TOR110');
        expect(tableRole[1]).toHaveTextContent('SAT');
    });
});
