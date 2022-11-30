

interface teamObject {
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    id: number;
    name: string;

}


interface basketballDataType {
    data: {
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
    }[];
    meta: Object;
}
export type {basketballDataType, teamObject};