import React from "react";

import { basketballData } from "../types/basketballdata";
import './DateCard.css'

const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC'
]

const days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
]

interface DateCardProps {
    data: basketballData,
}

const DateCard = ({data}: DateCardProps) => (
    data &&
    //uses hardcoded 8Xpx height for date-card-table
    <div className="date-card">
        <table className="date-card-table">
            <thead>
                <tr>
                </tr>
            </thead>
            <tbody className="">
                <tr>
                    <td>{days[data.date.getDay()]}</td>
                </tr>
                <tr>
                    <td>{months[data.date.getMonth()]} {data.date.getDate()}</td>
                </tr>
            </tbody>
            <tfoot><tr></tr></tfoot>
        </table>
    </div>
)
export default DateCard;