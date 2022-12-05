

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
export type {basketballDataType, basketballData, teamObject};
export default emptyDateObject;