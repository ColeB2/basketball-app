

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
  dateObj?: boolean,
  date: Date;
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
};

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
  min: number;
  oreb: number;
  pf: number;
  pts: number;
  reb: number;
  stl: number;
  turnover: number;
  player: Object;
  game: Object;
  team: Object;
  

}
// {{
//   "id":857701
//   "date":"2022-12-04T00:00:00.000Z",
//   "home_team_id":30,
//   "home_team_score":119,
//   "period":4,
//   "postseason":false,
//   "season":2022,
//   "status":"Final",
//   "time":
//   "Final",
//   "visitor_team_id":14,
//   "visitor_team_score":130},
//   "player":{
//     "id":3547242,
//     "first_name":"Deni",
//     "height_feet":null,
//     "height_inches":null,
//     "last_name":"Avdija",
//     "position":"F",
//     "team_id":30,
//     "weight_pounds":null},
//     "pts":7,"reb":8,"stl":2,
//     "team":{
//       "id":30,
//       "abbreviation":"WAS",
//       "city":"Washington",
//       "conference":"East",
//       "division":"Southeast",
//       "full_name":"Washington Wizards",
//       "name":"Wizards"},
//       "turnover":1},

const emptyDateObject = {
  dateObj: true,
  date: null,
  home_team: {},
  home_team_score: 0,
  id: 0,
  period: 0,
  postseason:  0,
  season: 0,
  status: 0,
  time: 0,
  visitor_team: 0,
  visitor_team_score: 0
}


interface basketballDataType {
    data: basketballData[];
    meta: Object;
}

interface boxscoreDataType {
  data: playerStatsDataType[];
  meta: Object;
}


export type {basketballDataType, basketballData, boxscoreDataType, playerStatsDataType, teamObject};
export default emptyDateObject;