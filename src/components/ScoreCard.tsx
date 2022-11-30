import React from "react";

import {teamObject} from '../types/basketballdata'

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
    <table className="card">
        <thead>
            <tr>
                <th colSpan={2}><a>{props.time}</a></th>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{props.visitor_team.abbreviation}</td>
                <td className="text-end">{props.visitor_team_score}</td>
            </tr>
            <tr>
                <td>{props.home_team.abbreviation}</td>
                <td className="text-end">{props.home_team_score}</td>
            </tr>
        </tbody>
    </table>
)
export default ScoreCard;