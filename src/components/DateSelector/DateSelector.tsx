import './DateSelector.css';

// eslint-disable-next-line
interface DateSelectorProps {
    date: Date;
}
function DateSelector(props: DateSelectorProps) {
    // Currently use for date for today/yesterday date inside <App/>
    // Probably have a function to reuse this. to get date string.
    const today = props.date;
    const dates = [...Array(7)].map((_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateYear = d.getFullYear();
        const dateMonth = d.getMonth() + 1;
        const dateDay = d.getDate();
        const dateStr = `${dateYear}-${dateMonth}-${dateDay}`;
        return dateStr;
    });
    console.log(dates);
    return (
        <div className="date-selector-container">
            <select className="date-selector">
                {dates.map((item: string, idx: number) => (
                    <option key={idx}>{item}</option>
                ))}
            </select>
            {/* <p>{dates}</p> */}
        </div>
    );
}
export default DateSelector;
