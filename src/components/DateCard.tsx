import React from "react";

import { basketballData } from "../types/basketballdata";

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
    <div className="date-card">
        <table>
            <p>{days[data.date.getDay()]}</p>
            <p>{months[data.date.getMonth()]}, {data.date.getDate()}</p>
        </table>
        
    </div>
)
export default DateCard;