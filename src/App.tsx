import { useState, useEffect } from 'react';
import './App.css';
import BoxScore from './components/BoxScore/BoxScore';
import Carousel from './components/Carousel/Carousel';
import Misc from './components/Misc/Misc';
import emptyDateObject from './types/basketballdata';
import {
    basketballDataType,
    basketballData,
    playerStatsDataType,
    gameDataType,
} from './types/basketballdata';
import { minutesSort } from './helpers/helperFunctions';

import axios from 'axios';

const baseURL = 'https://www.balldontlie.io/api/v1/games';
const baseGameURL =
    'https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=';

function App() {
    const [theme, setTheme] = useState('light');
    const [yestStats, setYestStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [todayStats, setTodayStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [currentGameID, setCurrentGameID] = useState<number>(0);
    const [currentGameData, setCurrentGameData] = useState<gameDataType>(
        {} as gameDataType
    );

    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    const yestYear = yest.getFullYear();
    const yestMonth = yest.getMonth() + 1;
    const yestDay = yest.getDate();
    const dateStr = `${yestYear}-${yestMonth}-${yestDay}`;
    useEffect(() => {
        // eslint-disable-next-line
        axios.get(baseURL + "?dates[]=" + dateStr).then((response:any) => {
            response.data.data.map((item: basketballData) => {
                item.dateObj = false;
            });
            setYestStats(response.data);
        });
    }, []);

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();
    const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;
    useEffect(() => {
        // TODO: Fix all eslint-disable-next-lines that is the response:any fix.
        // eslint-disable-next-line
        axios.get(baseURL + "?dates[]=" + todayStr).then((response:any) => {
            response.data.data.map((item: basketballData) => {
                item.dateObj = false;
            });
            // TODO Work on sorting Today game data by start time.
            // Also work on implementing Time left in quarter.
            // console.log('Testing sorting data',response.data)
            // const todayData = [].concat(response.data.data)
            // .sort((a,b) => a["status"] < b["status"] ? 1 : -1)

            setTodayStats(response.data);
        });
    }, []);

    // current Game Boxscore data --> updates when gameId changes.
    useEffect(() => {
        // eslint-disable-next-line
        axios.get(baseGameURL + currentGameID.toString()).then((response:any) => {
                const boxScoreData = response.data;
                if (boxScoreData.data.length !== 0) {
                    const home_team_id = boxScoreData.data[0].game.home_team_id;
                    const away_team_id =
                        boxScoreData.data[0].game.visitor_team_id;
                    const home_team = boxScoreData.data.filter(
                        (player: playerStatsDataType) =>
                            player.team.id === home_team_id
                    );
                    const away_team = boxScoreData.data.filter(
                        (player: playerStatsDataType) =>
                            player.team.id === away_team_id
                    );
                    home_team.sort(minutesSort);
                    away_team.sort(minutesSort);
                    setCurrentGameData({
                        home_team: home_team,
                        away_team: away_team,
                    });
                }
            });
    }, [currentGameID]);

    function selectGameClick(id: number) {
        setCurrentGameID(id);
    }

    function toggleTheme() {
        const color = theme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0, 0, 0)';
        const themeVal = theme == 'dark' ? 'light' : 'dark';
        setTheme(themeVal);
        document.documentElement.style.setProperty('--background-color', color);
    }

    const todayDateObj = Object.assign(emptyDateObject, { date: today });
    return (
        <div className="container" data-theme={theme}>
            <div className="App">
                <div className="header-container">
                    <Misc theme={theme} handleClick={toggleTheme} />
                    {yestStats.data && todayStats.data && (
                        <Carousel
                            key={1}
                            // data={test.data}
                            data={[
                                ...yestStats.data,
                                todayDateObj,
                                ...todayStats.data,
                            ]}
                            meta={yestStats.meta}
                            handleClick={selectGameClick}
                        />
                    )}
                </div>
                {/* BoxScore --> App --> splits home/away inside component? */}
                <div className="boxscore-containers">
                    {currentGameID !== 0 && currentGameData.away_team && (
                        <BoxScore data={currentGameData.away_team} />
                    )}
                    {currentGameID !== 0 && currentGameData.home_team && (
                        <BoxScore data={currentGameData.home_team} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
