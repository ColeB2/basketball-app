import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import DateCard from './DateCard';
import emptyDateObject from '../../types/basketballdata';

describe('Carousel', () => {
    it('Renders DateCard component:', () => {
        // Arrange
        render(<DateCard data={todayDateObj} />);
        // Act
        // Expect
        // Same as ScoreCard tests --> empty container
        // That renders a bunch of ScoreCards/DateCards
        const dateCard = screen.getAllByRole('cell');
        // row 1: 'WED' row2: 'DEC 7'
        expect(dateCard[0]).toHaveTextContent('WED');
        expect(dateCard[1]).toHaveTextContent('DEC 7');
    });
});

////////////////////////
// Mock Testing Data //
///////////////////////
const testDate = new Date('2022-12-08');
const todayDateObj = Object.assign(emptyDateObject, { date: testDate });
