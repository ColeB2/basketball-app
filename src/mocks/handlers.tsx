import { rest } from 'msw';
import { MOCK_GAMES_DATA, MOCK_BOXSCORE_DATA } from '../tests/testData';
import YEST_API from '../tests/yesterdayGameData';
import TODAY_API from '../tests/todayGameData';
import BOXSCORE_API from '../tests/todayGameBoxscoreData';

const apiDateCalls: string[] = [];
// add a type here: : { [key: string]}
const boxScoreId = {
    858450: BOXSCORE_API.game1,
    858447: BOXSCORE_API.game2,
    858449: BOXSCORE_API.game1,
    858448: BOXSCORE_API.game2,
};

export const restHandlers = [
    // rest.get('https://www.balldontlie.io/api/v1/games', (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json(MOCK_GAMES_DATA));
    // }),
    // rest.get('https://www.balldontlie.io/api/v1/games', (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json(YEST_API));
    // }),
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
        console.log('id------------>', id, id !== null, typeof id);
        if (id !== null && id in boxScoreId) {
            // console.log('here', 'we made it')
            // console.log('BOXSCORE_API[id', BOXSCORE_API[id]);
            // console.log('HURR', BOXSCORE_API['858450']);
            return res(ctx.status(200), ctx.json(boxScoreId[id]));
        }
        return res(ctx.status(200), ctx.json(BOXSCORE_API.game1));
    }),
    // rest.get('https://www.balldontlie.io/api/v1/stats', (req, res, ctx) => {
    //     return res(ctx.status(200), ctx.json(MOCK_BOXSCORE_DATA));
    // }),
];
