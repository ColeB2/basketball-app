//TODO FIX ALL ESLINT SKIPS

import './BoxScore.css';

interface BoxScoreProps {
    // data: playerStatsDataType[];
    // eslint-disable-next-line
    data: any;
}

export const columns = [
    {
        label: 'First',
        accessor: 'first_name',
        accessor2: 'last_name',
        player: true,
    },
    // {label: "Last", accessor: "last_name", player: true},
    { label: 'MIN', accessor: 'min' },
    { label: 'PTS', accessor: 'pts' },
    { label: 'FGM', accessor: 'fgm' },
    { label: 'FGA', accessor: 'fga' },
    { label: 'FG%', accessor: 'fg_pct', rate: true },
    { label: '3PM', accessor: 'fg3m' },
    { label: '3PA', accessor: 'fg3a' },
    { label: '3P%', accessor: 'fg3_pct', rate: true },
    { label: 'FTM', accessor: 'ftm' },
    { label: 'FTA', accessor: 'fta' },
    { label: 'FT%', accessor: 'ft_pct', rate: true },
    { label: 'OR', accessor: 'oreb' },
    { label: 'REB', accessor: 'reb' },
    { label: 'AST', accessor: 'ast' },
    { label: 'BLK', accessor: 'blk' },
    { label: 'STL', accessor: 'stl' },
    { label: 'TO', accessor: 'turnover' },
    { label: 'PF', accessor: 'pf' },
];

const BoxScore = (props: BoxScoreProps) => {
    return (
        props &&
        props.data.keys && (
            <div className="boxscore-container">
                <h1 className="boxscore-title">
                    {props.data[0].team.full_name}
                </h1>
                <div className="boxscore-table-div">
                    <table className="boxscore-table boxscore-table-hover">
                        <thead>
                            <tr>
                                <th className="player">
                                    {props.data[0].team.city}
                                </th>
                                {columns.map(({ label, accessor, player }) => {
                                    if (player) {
                                        return;
                                    }
                                    return (
                                        <th key={accessor} className={accessor}>
                                            {label}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Fix */}
                            {/* eslint-disable-next-line */}
                        {props.data.map((item: any, idx: number) => {
                                return (
                                    <tr key={item.id}>
                                        {columns.map(
                                            ({
                                                accessor,
                                                player,
                                                accessor2,
                                                rate,
                                            }) => {
                                                // Handles information held in item.player instead of item.
                                                if (player) {
                                                    const tdata = item.player[
                                                        accessor
                                                    ]
                                                        ? item.player[accessor]
                                                        : '---';
                                                    const tdata2 = item.player[
                                                        accessor2
                                                    ]
                                                        ? item.player[accessor2]
                                                        : '---';
                                                    return (
                                                        // Regex to shorten name
                                                        <td
                                                            key={accessor}
                                                            className={'player'}
                                                        >{`${tdata.replace(
                                                            /\b(\w)\w+/g,
                                                            '$1.'
                                                        )} ${tdata2}`}</td>
                                                    );
                                                } else if (rate) {
                                                    const tdata = item[accessor]
                                                        ? (
                                                              item[accessor] *
                                                              100
                                                          ).toFixed(1)
                                                        : '0.0';
                                                    return (
                                                        <td
                                                            key={accessor}
                                                            className={accessor}
                                                        >
                                                            {tdata}
                                                        </td>
                                                    );
                                                    // Handles all other values.
                                                } else {
                                                    const tdata = item[accessor]
                                                        ? item[accessor]
                                                        : '0';
                                                    return (
                                                        <td
                                                            key={accessor}
                                                            className={accessor}
                                                        >
                                                            {tdata}
                                                        </td>
                                                    );
                                                }
                                            }
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
};

export default BoxScore;
