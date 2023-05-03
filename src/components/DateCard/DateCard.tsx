import { basketballData } from '../../types/basketballdata';
import './DateCard.css';

import { monthsList, daysList } from '../../helpers/helperData';

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
                                daysList[data.date.getDay()].toUpperCase()}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {typeof data.date != 'string' &&
                                monthsList[
                                    data.date.getMonth()
                                ].toUpperCase()}{' '}
                            {typeof data.date != 'string' &&
                                data.date.getDate()}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
export default DateCard;
