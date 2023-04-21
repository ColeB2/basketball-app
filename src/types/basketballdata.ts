interface teamObject {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;
}

interface basketballData {
    dateObj?: boolean;
    date: Date | string;
    home_team: teamObject;
    home_team_score: number;
    id: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team: teamObject;
    visitor_team_score: number;
}

// Data type used inside playerStatsDataType
interface gameStatsDataType {
    // date: Date;
    date: string;
    home_team_id: number;
    home_team_score: number;
    id: number;
    period: number;
    postseason: boolean;
    season: number;
    status: string;
    time: string;
    visitor_team_id: number;
    visitor_team_score: number;
}

interface playerInfoDataType {
    first_name: string;
    height_feet: number | null;
    height_inches: number | null;
    id: number;
    last_name: string;
    position: string;
    team_id: number;
    weight_pounds: number | null;
}

interface playerStatsDataType {
    id: number;
    ast: number;
    blk: number;
    dreb: number;
    fg3_pct: number;
    fg3a: number;
    fg3m: number;
    fg_pct: number;
    fga: number;
    fgm: number;
    ft_pct: number;
    fta: number;
    ftm: number;
    min: string;
    oreb: number;
    pf: number;
    pts: number;
    reb: number;
    stl: number;
    turnover: number;
    player: playerInfoDataType;
    game: gameStatsDataType;
    team: teamObject;
    [key: string]:
        | number
        | string
        | playerInfoDataType
        | gameStatsDataType
        | teamObject;
}

interface basketballDataType {
    data: basketballData[];
    // meta: object;
}

interface boxscoreDataType {
    data: playerStatsDataType[];
}

interface gameDataType {
    home_team: playerStatsDataType[];
    away_team: playerStatsDataType[];
}

interface apiGamesDataType {
    data: {
        data: basketballData[];
    };
}

interface apiBoxscoreDataType {
    data: {
        data: playerStatsDataType[];
    };
}

interface swiperElement extends HTMLElement {
    swiper: {
        realIndex: number;
    };
}

export type {
    apiGamesDataType,
    apiBoxscoreDataType,
    basketballDataType,
    basketballData,
    boxscoreDataType,
    gameDataType,
    gameStatsDataType,
    playerStatsDataType,
    playerInfoDataType,
    swiperElement,
    teamObject,
};
