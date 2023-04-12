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
                        <td>
                            {typeof data.date != 'string' &&
                                daysList[data.date.getDay()]}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {typeof data.date != 'string' &&
                                monthsList[data.date.getMonth()]}{' '}
                            {typeof data.date != 'string' &&
                                data.date.getDate()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
export default DateCard;
