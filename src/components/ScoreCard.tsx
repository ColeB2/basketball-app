import React from "react";

import {teamObject} from '../types/basketballdata'
import NBAIconsMap from '../helpers/nbaiconsmap'

interface ScoreCardProps {
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
    handleClick?: Function;
}


const ScoreCard = (props: ScoreCardProps) => (
    <div className="card">
        <table className="card-table">
            <thead className="card-table-head">
                <tr className="card-table-row">
                    <th colSpan={2} className="status">{props.time ? props.time : props.status}</th>
                    {/* <td></td> */}
                </tr>
            </thead>
            <tbody className="">
                <tr className="card-table-row">
                    <td className="team-icon">
                        {NBAIconsMap[props.visitor_team.abbreviation]}
                    </td>
                    <td className="team-abbr">{props.visitor_team.abbreviation}</td>
                    <td className="team-score">{props.visitor_team_score}</td>
                </tr>
                <tr className="card-table-row">
                    <td className="team-icon">
                        {NBAIconsMap[props.home_team.abbreviation]}
                    </td>
                    <td className="team-abbr">{props.home_team.abbreviation}</td>
                    <td className="team-score">{props.home_team_score}</td>
                </tr>
            </tbody>
        </table>
    </div>
)
export default ScoreCard;