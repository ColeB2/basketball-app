import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import DateCard from './DateCard';
import testData from '../test_data/testData';

describe('Carousel', () => {
    it('Renders DateCard component:', () => {
        // Arrange
        render(<DateCard data={testData.testDateObj} />);

        // Act
        // Expect
        // Same as ScoreCard tests --> empty container
        // That renders a bunch of ScoreCards/DateCards
        const dateCard = screen.getAllByRole('cell');
        // row 1: 'SAT' row2: 'DEC 17'
        expect(dateCard[0]).toHaveTextContent('SAT');
        expect(dateCard[1]).toHaveTextContent('DEC 17');
    });
});
