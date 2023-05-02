import './DateSelector.css';

import { formatDropdownDate } from '../../helpers/helperFunctions';

// eslint-disable-next-line
interface DateSelectorProps {
    date: Date;
    handleClick: (date: Date) => void;
}
function DateSelector(props: DateSelectorProps) {
    // Get yesterday date constant so date doesn't change when we change
    // the chosen date prop to select games.
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date(yesterday);
        d.setDate(d.getDate() - i);
        return d;
    });
    return (
        <div className="date-selector-container">
            <select
                className="date-selector"
                onChange={(e) => props.handleClick(new Date(e.target.value))}
            >
                {dates.map((item: Date, idx: number) => (
                    <option value={item.toISOString()} key={idx}>
                        {formatDropdownDate(item)}
                    </option>
                ))}
            </select>
            {/* <p>{dates}</p> */}
        </div>
    );
}
export default DateSelector;
