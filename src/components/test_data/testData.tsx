import {
    teamObject,
    gameStatsDataType,
    basketballData,
    playerStatsDataType,
    playerInfoDataType,
} from '../../types/basketballdata';
import emptyDateObject from '../../types/basketballdata';

const raptorsTeam: teamObject = {
    abbreviation: 'TOR',
    city: 'Toronto',
    conference: 'East',
    division: 'Atlantic',
    full_name: 'Toronto Raptors',
    id: 28,
    name: 'Raptors',
};

const warriorsTeam: teamObject = {
    abbreviation: 'GSW',
    city: 'Golden State',
    conference: 'West',
    division: 'Pacific',
    full_name: 'Golden State Warriors',
    id: 10,
    name: 'Warriors',
};

const testDate = new Date('2022-12-17T07:00:00.000Z');
const testDateObj = Object.assign(emptyDateObject, { date: testDate });

const gameStatsTestData: gameStatsDataType = {
    date: testDate,
    home_team_id: 28,
    home_team_score: 110,
    id: 857802,
    period: 4,
    postseason: false,
    season: 2022,
    status: 'Final',
    time: 'Final',
    visitor_team_id: 10,
    visitor_team_score: 126,
};

const basketballTestData: basketballData = {
    dateObj: false,
    date: testDate,
    home_team: raptorsTeam,
    home_team_score: 110,
    id: 857802,
    period: 4,
    postseason: false,
    season: 2022,
    status: 'Final',
    time: 'Final',
    visitor_team: warriorsTeam,
    visitor_team_score: 126,
};

const player1: playerInfoDataType = {
    id: 206,
    first_name: 'Juancho',
    height_feet: 6,
    height_inches: 9,
    last_name: 'Hernangomez',
    position: 'F',
    team_id: 28,
    weight_pounds: 230,
};
const player2: playerInfoDataType = {
    id: 416,
    first_name: 'Pascal',
    height_feet: 6,
    height_inches: 9,
    last_name: 'Siakam',
    position: 'F',
    team_id: 28,
    weight_pounds: 230,
};
const player3: playerInfoDataType = {
    id: 38017710,
    first_name: 'Christian',
    height_feet: null,
    height_inches: null,
    last_name: 'Koloko',
    position: 'C',
    team_id: 28,
    weight_pounds: null,
};
const player4: playerInfoDataType = {
    id: 17896055,
    first_name: 'Scottie',
    height_feet: null,
    height_inches: null,
    last_name: 'Barnes',
    position: 'G-F',
    team_id: 28,
    weight_pounds: null,
};
const player5: playerInfoDataType = {
    id: 458,
    first_name: 'Fred',
    height_feet: 6,
    height_inches: 0,
    last_name: 'VanVleet',
    position: 'G',
    team_id: 28,
    weight_pounds: 195,
};
const player6: playerInfoDataType = {
    id: 3547249,
    first_name: 'Precious',
    height_feet: null,
    height_inches: null,
    last_name: 'Achiuwa',
    position: 'F',
    team_id: 28,
    weight_pounds: null,
};
const player7: playerInfoDataType = {
    id: 17896094,
    first_name: 'Dalano',
    height_feet: null,
    height_inches: null,
    last_name: 'Banton',
    position: 'G',
    team_id: 28,
    weight_pounds: null,
};
const player8: playerInfoDataType = {
    id: 46,
    first_name: 'Khem',
    height_feet: 6,
    height_inches: 9,
    last_name: 'Birch',
    position: 'C',
    team_id: 28,
    weight_pounds: 233,
};
const player9: playerInfoDataType = {
    id: 58,
    first_name: 'Chris',
    height_feet: 6,
    height_inches: 10,
    last_name: 'Boucher',
    position: 'F',
    team_id: 28,
    weight_pounds: 200,
};
const player10: playerInfoDataType = {
    id: 3547275,
    first_name: 'Malachi',
    height_feet: null,
    height_inches: null,
    last_name: 'Flynn',
    position: 'G',
    team_id: 28,
    weight_pounds: null,
};
const player11: playerInfoDataType = {
    id: 3089,
    first_name: 'Gary',
    height_feet: 6,
    height_inches: 6,
    last_name: 'Trent Jr.',
    position: '',
    team_id: 28,
    weight_pounds: 205,
};
const player12: playerInfoDataType = {
    id: 489,
    first_name: 'Thaddeus',
    height_feet: 6,
    height_inches: 8,
    last_name: 'Young',
    position: 'F',
    team_id: 28,
    weight_pounds: 221,
};
const player13: playerInfoDataType = {
    id: 18,
    first_name: 'OG',
    height_feet: 6,
    height_inches: 8,
    last_name: 'Anunoby',
    position: 'F',
    team_id: 28,
    weight_pounds: 232,
};
const player14: playerInfoDataType = {
    id: 17896039,
    first_name: 'Justin',
    height_feet: null,
    height_inches: null,
    last_name: 'Champagnie',
    position: 'F',
    team_id: 28,
    weight_pounds: null,
};
const player15: playerInfoDataType = {
    id: 17553988,
    first_name: 'Jeff',
    height_feet: null,
    height_inches: null,
    last_name: 'Dowtin',
    position: 'G',
    team_id: 28,
    weight_pounds: null,
};
const player16: playerInfoDataType = {
    id: 38017717,
    first_name: 'Ron',
    height_feet: null,
    height_inches: null,
    last_name: 'Harper Jr.',
    position: 'F',
    team_id: 28,
    weight_pounds: null,
};
const player17: playerInfoDataType = {
    id: 376,
    first_name: 'Otto',
    height_feet: 6,
    height_inches: 8,
    last_name: 'Porter Jr.',
    position: 'F',
    team_id: 28,
    weight_pounds: 198,
};

const boxscoreData: playerStatsDataType[] = [
    {
        ast: 0,
        blk: 1,
        dreb: 2,
        fg3_pct: 0.33333334,
        fg3a: 3,
        fg3m: 1,
        fg_pct: 0.25,
        fga: 4,
        fgm: 1,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476001,
        min: '23',
        oreb: 2,
        pf: 3,
        player: player1,
        pts: 3,
        reb: 4,
        stl: 0,
        team: raptorsTeam,
        turnover: 1,
    },
    {
        ast: 6,
        blk: 0,
        dreb: 3,
        fg3_pct: 0.6,
        fg3a: 5,
        fg3m: 3,
        fg_pct: 0.45,
        fga: 20,
        fgm: 9,
        ft_pct: 0.85714287,
        fta: 7,
        ftm: 6,
        game: gameStatsTestData,
        id: 12476002,
        min: '37',
        oreb: 2,
        pf: 2,
        player: player2,
        pts: 27,
        reb: 5,
        stl: 0,
        team: raptorsTeam,
        turnover: 1,
    },
    {
        ast: 0,
        blk: 1,
        dreb: 2,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 1,
        fga: 1,
        fgm: 1,
        ft_pct: 0.5,
        fta: 2,
        ftm: 1,
        game: gameStatsTestData,
        id: 12476003,
        min: '20',
        oreb: 1,
        pf: 4,
        player: player3,
        pts: 3,
        reb: 3,
        stl: 0,
        team: raptorsTeam,
        turnover: 2,
    },
    {
        ast: 3,
        blk: 0,
        dreb: 3,
        fg3_pct: 0.33333334,
        fg3a: 3,
        fg3m: 1,
        fg_pct: 0.4375,
        fga: 16,
        fgm: 7,
        ft_pct: 1,
        fta: 2,
        ftm: 2,
        game: gameStatsTestData,
        id: 12476004,
        min: '32',
        oreb: 2,
        pf: 1,
        player: player4,
        pts: 17,
        reb: 5,
        stl: 1,
        team: raptorsTeam,
        turnover: 3,
    },
    {
        ast: 8,
        blk: 0,
        dreb: 4,
        fg3_pct: 0.4,
        fg3a: 10,
        fg3m: 4,
        fg_pct: 0.3888889,
        fga: 18,
        fgm: 7,
        ft_pct: 1,
        fta: 4,
        ftm: 4,
        game: gameStatsTestData,
        id: 12476005,
        min: '35',
        oreb: 0,
        pf: 4,
        player: player5,
        pts: 22,
        reb: 4,
        stl: 1,
        team: raptorsTeam,
        turnover: 2,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476006,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player6,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 2,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 1,
        fg3m: 0,
        fg_pct: 0.33333334,
        fga: 6,
        fgm: 2,
        ft_pct: 0,
        fta: 1,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476007,
        min: '13',
        oreb: 0,
        pf: 1,
        player: player7,
        pts: 4,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476008,
        min: '01',
        oreb: 0,
        pf: 0,
        player: player8,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 7,
        fg3_pct: 0,
        fg3a: 2,
        fg3m: 0,
        fg_pct: 0.4,
        fga: 10,
        fgm: 4,
        ft_pct: 0.75,
        fta: 4,
        ftm: 3,
        game: gameStatsTestData,
        id: 12476009,
        min: '25',
        oreb: 7,
        pf: 4,
        player: player9,
        pts: 11,
        reb: 14,
        stl: 0,
        team: raptorsTeam,
        turnover: 1,
    },
    {
        ast: 2,
        blk: 0,
        dreb: 2,
        fg3_pct: 0.5,
        fg3a: 8,
        fg3m: 4,
        fg_pct: 0.375,
        fga: 16,
        fgm: 6,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476010,
        min: '37',
        oreb: 4,
        pf: 1,
        player: player10,
        pts: 16,
        reb: 6,
        stl: 1,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476011,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player11,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 2,
        fg3_pct: 0,
        fg3a: 1,
        fg3m: 0,
        fg_pct: 0.75,
        fga: 4,
        fgm: 3,
        ft_pct: 0.5,
        fta: 2,
        ftm: 1,
        game: gameStatsTestData,
        id: 12476012,
        min: '17',
        oreb: 0,
        pf: 2,
        player: player12,
        pts: 7,
        reb: 2,
        stl: 3,
        team: raptorsTeam,
        turnover: 2,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476013,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player13,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476014,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player14,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476015,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player15,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476016,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player16,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
    {
        ast: 0,
        blk: 0,
        dreb: 0,
        fg3_pct: 0,
        fg3a: 0,
        fg3m: 0,
        fg_pct: 0,
        fga: 0,
        fgm: 0,
        ft_pct: 0,
        fta: 0,
        ftm: 0,
        game: gameStatsTestData,
        id: 12476017,
        min: '00',
        oreb: 0,
        pf: 0,
        player: player17,
        pts: 0,
        reb: 0,
        stl: 0,
        team: raptorsTeam,
        turnover: 0,
    },
];

export default {
    raptorsTeam,
    warriorsTeam,
    gameStatsTestData,
    basketballTestData,
    boxscoreData,
    testDateObj,
};
