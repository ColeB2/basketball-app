import { useState, useEffect } from 'react';
import './App.css';
import BoxScore from './components/BoxScore/BoxScore';
import Carousel from './components/Carousel/Carousel';
import Misc from './components/Misc/Misc';
import DateSelector from './components/DateSelector/DateSelector';
import { emptyDateObject } from './helpers/helperData';
import {
    apiGamesDataType,
    apiBoxscoreDataType,
    basketballDataType,
    basketballData,
    playerStatsDataType,
    gameDataType,
} from './types/basketballdata';
import {
    formatAPIDate,
    formatTimeInET,
    gameStartTimeSort,
    minutesSort,
} from './helpers/helperFunctions';

import basketballApi from './api/basketball';

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

    const [chosenDate, setChosenDate] = useState<Date>(new Date());

    useEffect(() => {
        const yest = new Date(chosenDate);
        yest.setDate(yest.getDate() - 1);
        const fetchYesterdayGames = async () => {
            try {
                await basketballApi
                    .get('/games?dates[]=' + formatAPIDate(yest))
                    .then((res: apiGamesDataType) => {
                        // console.log('yest res----', res);
                        res.data.data.map((item: basketballData) => {
                            item.dateObj = false;
                            item.status = formatTimeInET(item.status);
                        });
                        setYestStats(res.data);
                    });
            } catch (err) {
                let message;
                if (err instanceof Error) message = err.message;
                else message;
                console.log(message);
            }
        };
        fetchYesterdayGames();
    }, [chosenDate]);

    useEffect(() => {
        const fetchTodaysGames = async () => {
            try {
                await basketballApi
                    .get('/games?dates[]=' + formatAPIDate(chosenDate))
                    .then((res: apiGamesDataType) => {
                        // console.log('today res----', res);
                        res.data.data.map((item: basketballData) => {
                            item.dateObj = false;
                            item.status = formatTimeInET(item.status);
                        });
                        res.data.data.sort(gameStartTimeSort);
                        setTodayStats(res.data);
                    });
            } catch (err) {
                let message;
                if (err instanceof Error) message = err.message;
                else message;
                console.log(message);
            }
        };
        fetchTodaysGames();
    }, [chosenDate]);

    // current Game Boxscore data --> updates when gameId changes.
    useEffect(() => {
        const fetchBoxscore = async () => {
            try {
                await basketballApi
                    .get(
                        '/stats?per_page=100&game_ids[]=' +
                            currentGameID.toString()
                    )
                    .then((res: apiBoxscoreDataType) => {
                        // console.log('boxscore, res', res);
                        const boxScoreData = res.data;
                        if (boxScoreData.data.length !== 0) {
                            const home_team_id =
                                boxScoreData.data[0].game.home_team_id;
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
            } catch (err) {
                let message;
                if (err instanceof Error) message = err.message;
                else message;
                console.log(message);
            }
        };
        fetchBoxscore();
    }, [currentGameID]);

    function selectGameClick(id: number) {
        setCurrentGameID(id);
    }

    function setGameDate(date: Date) {
        setChosenDate(date);
    }

    function toggleTheme() {
        const color = theme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0, 0, 0)';
        const themeVal = theme == 'dark' ? 'light' : 'dark';
        setTheme(themeVal);
        document.documentElement.style.setProperty('--background-color', color);
    }

    const todayDateObj = Object.assign(emptyDateObject, { date: chosenDate });
    return (
        <div className="container" data-theme={theme}>
            <div className="App">
                <div className="header-container">
                    <div className="misc-container">
                        <DateSelector
                            date={chosenDate}
                            handleClick={setGameDate}
                        />
                        <Misc theme={theme} handleClick={toggleTheme} />
                    </div>
                    {yestStats.data && todayStats.data && (
                        <Carousel
                            key={1}
                            // data={test.data}
                            data={[
                                ...yestStats.data,
                                todayDateObj,
                                ...todayStats.data,
                            ]}
                            // meta={yestStats.meta}
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
