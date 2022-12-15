import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import ScoreCard from './ScoreCard';

// Mock Testing Data
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

describe('ScoreCard', () => {
    it('Renders ScoreCard component', () => {
        // Arrange
        // const item = { id: 1 };
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={item.id}
                handleClick={() => handleClick()}
                {...item}
            />
        );
        // Act
        // Expect
        const tableRole = screen.getByRole('table');
        // tableRole textContent returns:
        // 'FinalBoston CelticsBOS99Toronto RaptorsTOR100'
        expect(tableRole).toHaveTextContent('Final');
        expect(tableRole).toHaveTextContent('BOS99');
        expect(tableRole).toHaveTextContent('TOR100');
    });

    it('Render ScoreCard components renders header: status', () => {
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={item.id}
                handleClick={() => handleClick()}
                {...item}
            />
        );
        const colHeader = screen.getByRole('columnheader');
        expect(colHeader).toHaveTextContent('Final');
    });

    it('Render ScoreCard components renders header: time', () => {
        item.time = '7:00 ET';
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={item.id}
                handleClick={() => handleClick()}
                {...item}
            />
        );
        const colHeader = screen.getByRole('columnheader');
        expect(colHeader).toHaveTextContent('7:00 ET');
        //Return item back to normal state
        item.time = 'Final';
    });

    it('ScoreCard renders cells properly', () => {
        const handleClick = () => undefined;
        render(
            <ScoreCard
                key={item.id}
                handleClick={() => handleClick()}
                {...item}
            />
        );
        const cellContent = [
            // Boston Celtics --> name of svg image
            'Boston Celtics',
            'BOS',
            '99',
            // Toronto Raptors --> name of svg image
            'Toronto Raptors',
            'TOR',
            '100',
        ];
        const colHeader = screen.getAllByRole('cell');
        for (let i = 0; i < colHeader.length; i++) {
            expect(colHeader[i]).toHaveTextContent(cellContent[i]);
        }
    });
});
