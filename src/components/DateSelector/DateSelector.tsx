import './DateSelector.css';
// import { ChangeEvent, useRef, useState } from 'react';
import { formatDropdownDate } from '../../helpers/helperFunctions';
// import { getLast7Days } from '../../helpers/helperFunctions';

// eslint-disable-next-line
interface DateSelectorProps {
    date: Date;
    handleClick: (date: Date) => void;
}
function DateSelector(props: DateSelectorProps) {
    return (
        <div className="date-selector-container">
            <div className="date-display">{formatDropdownDate(props.date)}</div>
            <input
                className="date-selector"
                type="date"
                onChange={(e) =>
                    props.handleClick(new Date(e.target.value + 'T00:01'))
                }
                value={props.date ? props.date.toISOString().split('T')[0] : ''}
            />
        </div>
    );
}
export default DateSelector;
