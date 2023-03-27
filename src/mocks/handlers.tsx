import { rest } from 'msw';
// MOCK APIS FOR TESTING
import YEST_API from '../tests/yesterdayGameData';
import TODAY_API from '../tests/todayGameData';
import BOXSCORE_API from '../tests/todayGameBoxscoreData';
// TYPES
import { boxscoreDataType } from '../types/basketballdata';

const apiDateCalls: string[] = [];

interface apiDataTypes {
    [key: string]: boxscoreDataType;
}

const boxScoreId: apiDataTypes = {
    '858450': BOXSCORE_API.game1,
    '858447': BOXSCORE_API.game2,
    '858449': BOXSCORE_API.game3,
    '858448': BOXSCORE_API.game4,
};

export const restHandlers = [
    rest.get('https://www.balldontlie.io/api/v1/games', (req, res, ctx) => {
        const date: string | null = req.url.searchParams.get('dates[]');
        if (date) {
            apiDateCalls.push(date);
        }
        if (apiDateCalls[0] === date) {
            return res(ctx.status(200), ctx.json(YEST_API));
        } else {
            return res(ctx.status(200), ctx.json(TODAY_API));
        }
    }),
    rest.get('https://www.balldontlie.io/api/v1/stats', (req, res, ctx) => {
        const id: string | null = req.url.searchParams.get('game_ids[]');
        if (id !== null && id in boxScoreId) {
            return res(ctx.status(200), ctx.json(boxScoreId[id]));
        }
        return res(ctx.status(200), ctx.json({ data: [] }));
    }),
];
