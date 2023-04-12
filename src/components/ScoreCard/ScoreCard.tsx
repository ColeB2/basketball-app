import { teamObject } from '../../types/basketballdata';
import NBAIconsMap from '../../helpers/nbaiconsmap';

import './ScoreCard.css';

interface ScoreCardProps {
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
    handleClick: React.MouseEventHandler;
}

const ScoreCard = (props: ScoreCardProps) => (
    <div className="score-card" onClick={props.handleClick}>
        <table className="card-table">
            <thead className="card-table-head">
                <tr className="card-table-row">
                    <th colSpan={3} className="status">
                        {props.time ? props.time : props.status}
                    </th>
                </tr>
            </thead>
            <tbody className="">
                <tr className="card-table-row">
                    <td className="team-icon">
                        {NBAIconsMap[props.visitor_team.abbreviation]}
                    </td>
                    <td className="team-abbr">
                        {props.visitor_team.abbreviation}
                    </td>
                    <td className="team-score">{props.visitor_team_score}</td>
                </tr>
                <tr className="card-table-row">
                    <td className="team-icon">
                        {NBAIconsMap[props.home_team.abbreviation]}
                    </td>
                    <td className="team-abbr">
                        {props.home_team.abbreviation}
                    </td>
                    <td className="team-score">{props.home_team_score}</td>
                </tr>
            </tbody>
        </table>
    </div>
);
export default ScoreCard;
