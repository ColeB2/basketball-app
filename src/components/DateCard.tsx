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
    // Works, but not proper.
    // <div className="date-card">
    //     <table>
    //         <p>{days[data.date.getDay()]}</p>
    //         <p>{months[data.date.getMonth()]}, {data.date.getDate()}</p> 
    //     </table>
    // </div>

    //uses hardcoded 88px height for date-card-table
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