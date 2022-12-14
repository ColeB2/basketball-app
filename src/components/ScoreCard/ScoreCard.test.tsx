import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ScoreCard from './ScoreCard';

const team = {
    abbreviation: 'TOR',
    city: 'Toronto',
    conference: 'Eastern',
    division: 'Atlantic',
    full_name: 'Toronto Raptors',
    id: 1,
    name: 'Raptors',
};

const team2 = {
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
    home_team: team,
    home_team_score: 100,
    id: 1,
    period: 0,
    postseason: false,
    season: 2022,
    status: 'Final',
    time: 'Final',
    visitor_team: team2,
    visitor_team_score: 99,
};

describe('ScoreCard', () => {
    it('Renders ScoreCard component', () => {
        // Arrange
        // const item = { id: 1 };
        const handleClick = () => {};
        render(
            <ScoreCard
                key={item.id}
                handleClick={() => handleClick()}
                {...item}
            />
        );
        // Act
        // Expect
        screen.debug();
        const tableRole = screen.getByRole('table');
        expect(tableRole).toHaveTextContent('Final');
        // screen.getByRole('');
        // expect(
        //     screen.getByRole('generic', {
        //         level: 1,
        //     })
        // ).toHaveTextContent('<divclass="boxscore-containers"/>');
    });
});
