import { useState, useEffect } from 'react';
import './App.css';
import BoxScore from './components/BoxScore/BoxScore';
import Carousel from './components/Carousel/Carousel';
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
    const [test, setTest] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [todayStats, setTodayStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [currentGameID, setCurrentGameID] = useState<number>(0);
    const [currentGameData, setCurrentGameData] = useState<gameDataType>(
        {} as gameDataType
    );

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const dateStr = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()}`;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${
        today.getMonth() + 1
    }-${today.getDate()}`;
    useEffect(() => {
        // eslint-disable-next-line
        axios.get(baseURL + "?dates[]=" + dateStr).then((response:any) => {
            response.data.data.map((item: basketballData) => {
                item.dateObj = false;
            });
            setTest(response.data);
            console.log('Yesterdays Games Update');
        });
    }, []);

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
            console.log('Todays Games Update');
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
                    <div className="button-container">
                        <div className="toggle" onClick={toggleTheme}>
                            {theme == 'dark' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="button-image"
                                >
                                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    className="button-image"
                                >
                                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                </svg>
                            )}
                        </div>
                    </div>
                    {test.data && todayStats.data && (
                        <Carousel
                            key={1}
                            // data={test.data}
                            data={[
                                ...test.data,
                                todayDateObj,
                                ...todayStats.data,
                            ]}
                            meta={test.meta}
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
