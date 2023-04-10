import { basketballData } from '../../types/basketballdata';
import './DateCard.css';

export const monthsList = [
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
    'DEC',
];

export const daysList = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface DateCardProps {
    data: basketballData;
}

const DateCard = ({ data }: DateCardProps) =>
    data && (
        //uses hardcoded 8Xpx height for date-card-table
        <div className="date-card">
            <table className="date-card-table">
                <tbody className="">
                    <tr>
                        <td>{daysList[data.date.getDay()]}</td>
                    </tr>
                    <tr>
                        <td>
                            {monthsList[data.date.getMonth()]}{' '}
                            {data.date.getDate()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
export default DateCard;
