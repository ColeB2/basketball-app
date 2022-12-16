import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import Carousel from './Carousel';

describe('Carousel', () => {
    it('Renders Carousel component', () => {
        // Arrange
        const handleClick = () => undefined;
        render(
            <Carousel
                key={1}
                data={[item]}
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
        // 'FinalBoston CelticsBOS99Toronto RaptorsTOR100'
        expect(tableRole).toHaveTextContent('Final');
        expect(tableRole).toHaveTextContent('BOS99');
        expect(tableRole).toHaveTextContent('TOR100');
    });

    it('Renders Carousel component', () => {
        // Arrange
        const handleClick = () => undefined;
        render(
            <Carousel
                key={1}
                data={[item]}
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
        // 'FinalBoston CelticsBOS99Toronto RaptorsTOR100'
        expect(tableRole).toHaveTextContent('Final');
        expect(tableRole).toHaveTextContent('BOS99');
        expect(tableRole).toHaveTextContent('TOR100');
    });
});

////////////////////////
// Mock Testing Data //
///////////////////////
const home = {
    abbreviation: 'TOR',
    city: 'Toronto',
    conference: 'Eastern',
    division: 'Atlantic',
    full_name: 'Toronto Raptors',
    id: 1,
    name: 'Raptors',
};

const away = {
    abbreviation: 'BOS',
    city: 'Boston',
    conference: 'Eastern',
    division: 'Atlantic',
    full_name: 'Boston Celtics',
    id: 2,
    name: 'Celtics',
};

const item = {
    dateObj: false,
    date: new Date(),
    home_team: home,
    home_team_score: 100,
    id: 1,
    period: 0,
    postseason: false,
    season: 2022,
    status: 'Final',
    time: 'Final',
    visitor_team: away,
    visitor_team_score: 99,
};
