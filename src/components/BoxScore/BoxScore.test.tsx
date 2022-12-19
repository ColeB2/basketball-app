import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';

import BoxScore from './BoxScore';

describe('BoxScore', () => {
    it('Renders BoxScore component', () => {
        // Arrange
        render(<BoxScore data={boxScoreData} />);
        //Act
        //Expect
        screen.debug();
    });
});

////////////////////////
// Mock Testing Data //
///////////////////////
const playerInfo = {
    first_name: 'Pascal',
    height_feet: 6,
    height_inches: 9,
    id: 0,
    last_name: 'Siakam',
    position: 'PF',
    team_id: 0,
    weight_pounds: 230,
};

const testDate = new Date('2022-12-08');

const gameStats = {
    date: testDate,
    home_team_id: 0,
    home_team_score: 100,
    id: 0,
    period: 4,
    postseason: false,
    season: 2022,
    status: 'Final',
    time: 'Final',
    visitor_team_id: 1,
    visitor_team_score: 99,
};

const teamObject = {
    abbreviation: 'TOR',
    city: 'Toronto',
    conference: 'Easter',
    division: 'Atlantic',
    full_name: 'Toronto Raptors',
    id: '0',
    name: 'Raptors',
};

const boxScoreData = {
    id: 0,
    ast: 5,
    blk: 5,
    dreb: 5,
    fg3_pct: 40,
    fg3a: 4,
    fg3m: 10,
    fg_pct: 50,
    fga: 20,
    fgm: 10,
    ft_pct: 100,
    fta: 10,
    ftm: 10,
    min: 48,
    oreb: 5,
    pf: 0,
    pts: 34,
    reb: 10,
    stl: 5,
    turnover: 0,
    player: playerInfo,
    game: gameStats,
    team: teamObject,
};
