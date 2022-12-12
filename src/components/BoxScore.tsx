import React from "react";

import {playerStatsDataType} from '../types/basketballdata'

interface BoxScoreProps {
    // data: playerStatsDataType[];
    data: any;

}

const BoxScore = (props: BoxScoreProps) => {
    // const [tableData, setTableData] = useState(tableData)

    const columns = [
        {label: "First", accessor: "first_name", accessor2: "last_name",
            player: true
        },
        // {label: "Last", accessor: "last_name", player: true},
        {label: "MIN", accessor: "min"},
        {label: "PTS", accessor: "pts"},
        {label: "FGM", accessor: "fgm"},
        {label: "FGA", accessor: "fga"},
        {label: "FG%", accessor: "fg_pct", rate: true},
        {label: "3PM", accessor: "fg3m"},
        {label: "3PA", accessor: "fg3a"},
        {label: "3P%", accessor: "fg3_pct", rate: true},
        {label: "FTM", accessor: "ftm"},
        {label: "FTA", accessor: "fta"},
        {label: "FT%", accessor: "ft_pct", rate: true},
        {label: "OR",  accessor: "oreb"},
        {label: "REB", accessor: "reb"},
        {label: "AST", accessor: "ast"},
        {label: "BLK", accessor: "blk"},
        {label: "STL", accessor: "stl"},
        {label: "TO",  accessor: "turnover"},
        {label: "PF",  accessor: "pf"},
    ]
    
    return (
    props && props.data.keys &&
    <div className="boxscore-container table-responsive">
        <h1 className="boxscore-title">
            {props.data[0].team.full_name}
        </h1>
        <table className="boxscore-table table table-striped table-hover">

            <thead>
                <tr>
                    <th>
                        {props.data[0].team.city}
                    </th>
                    {columns.map(({label, accessor, player})=> {
                        if (player) {return}
                        return (
                            <th key={accessor} className={accessor}>
                                {label}
                            </th>

                        ) 
                        
                    })}
                    {/* <th>Pts</th> */}
                    {/* <th>Reb</th> */}
                    {/* <th>Ast</th> */}
                </tr>
            </thead>


            <tbody>
            {props.data.map((item: any,idx: number) => {
                return (
                    <tr key={idx}>
                        {columns.map(({accessor, player, accessor2, rate})=> {
                             // Handles information held in item.player instead of item.
                            if (player) { 
                                const tdata = item.player[accessor] ? item.player[accessor] : "---";
                                const tdata2 = item.player[accessor2] ? item.player[accessor2] : "---";
                                // return <td key={accessor}>{tdata2}, {tdata}</td>
                                return <td key={accessor}>{`${tdata2}, ${tdata}`}</td>
                            } else if (rate) {
                                const tdata = item[accessor] ? 
                                    (item[accessor] * 100).toFixed(1):
                                    "0.0";
                                return <td key={accessor}>{tdata}</td>
                            // Handles all other values.
                            } else {
                                const tdata = item[accessor] ? item[accessor] : "0";
                                return <td key={accessor}>{tdata}</td>
                            }
                        })}
                    </tr>
                );
                        // <tr key={idx}>
                        //     <td>
                        //         {item.player.first_name} {item.player.last_name}
                        //     </td>
                        //     <td>{item.pts}</td>
                        //     <td>{item.reb}</td>
                        //     <td>{item.ast}</td>
                        // </tr>
                // );
            })}
            </tbody>


        </table>
    </div>
    )
}

export default BoxScore