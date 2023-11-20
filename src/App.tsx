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
    getCachedBoxscoreData,
    getCachedScoreData,
    minutesSort,
} from './helpers/helperFunctions';

import basketballApi from './api/basketball';
import { cachedBoxscoreData, cachedGameData } from './api/cachedData';

const initialDate = new Date();
initialDate.setDate(initialDate.getDate() - 1);

function App() {
    const [theme, setTheme] = useState('light');

    const [dayOneStats, setDayOneStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [dayTwoStats, setDayTwoStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [currentGameID, setCurrentGameID] = useState<number>(0);
    const [currentGameData, setCurrentGameData] = useState<gameDataType>(
        {} as gameDataType
    );

    const [chosenDate, setChosenDate] = useState<Date>(initialDate);
    const [dayTwo, setDayTwo] = useState<Date>(new Date());

    // Day One Stats. Stats next to dropdown date selector.
    useEffect(() => {
        const data = getCachedScoreData(chosenDate, cachedGameData);
        if (data) {
            setDayOneStats(data);
        } else {
            const fetchDayOneGames = async () => {
                try {
                    await basketballApi
                        .get('/games?dates[]=' + formatAPIDate(chosenDate))
                        .then((res: apiGamesDataType) => {
                            res.data.data.map((item: basketballData) => {
                                item.dateObj = false;
                                item.status = formatTimeInET(item.status);
                            });
                            res.data.data.sort(gameStartTimeSort);
                            setDayOneStats(res.data);
                            cachedGameData[chosenDate.toLocaleDateString()] =
                                res.data;
                        });
                } catch (err) {
                    let message;
                    if (err instanceof Error) message = err.message;
                    else message;
                    console.log(message);
                }
            };
            fetchDayOneGames();
        }
    }, [chosenDate]);

    // Day after chosen Dates - Day 2 Stats. Games after mid carousel date card.
    useEffect(() => {
        const chosenDate2 = new Date(chosenDate);
        chosenDate2.setDate(chosenDate2.getDate() + 1);

        const data = getCachedScoreData(chosenDate2, cachedGameData);
        if (data) {
            setDayTwoStats(data);
        } else {
            const fetchDayTwoGames = async () => {
                try {
                    await basketballApi
                        .get('/games?dates[]=' + formatAPIDate(chosenDate2))
                        .then((res: apiGamesDataType) => {
                            res.data.data.map((item: basketballData) => {
                                item.dateObj = false;
                                item.status = formatTimeInET(item.status);
                            });
                            res.data.data.sort(gameStartTimeSort);
                            setDayTwoStats(res.data);
                            cachedGameData[chosenDate2.toLocaleDateString()] =
                                res.data;
                        });
                } catch (err) {
                    let message;
                    if (err instanceof Error) message = err.message;
                    else message;
                    console.log(message);
                }
            };
            fetchDayTwoGames();
        }
    }, [chosenDate]);

    // current Game Boxscore data --> updates when gameId changes.
    useEffect(() => {
        const data = getCachedBoxscoreData(currentGameID, cachedBoxscoreData);
        if (data) {
            setCurrentGameData(data);
        }
        const fetchBoxscore = async () => {
            try {
                await basketballApi
                    .get(
                        '/stats?per_page=100&game_ids[]=' +
                            currentGameID.toString()
                    )
                    .then((res: apiBoxscoreDataType) => {
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
                            cachedBoxscoreData[currentGameID] = {
                                home_team: home_team,
                                away_team: away_team,
                            };
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
        const secondDay = new Date(date);
        secondDay.setDate(date.getDate() + 1);
        setDayTwo(secondDay);
    }

    function toggleTheme() {
        const color = theme == 'dark' ? 'rgb(255,255,255)' : 'rgb(0, 0, 0)';
        const themeVal = theme == 'dark' ? 'light' : 'dark';
        setTheme(themeVal);
        document.documentElement.style.setProperty('--background-color', color);
    }

    // const dayTwo = new Date(chosenDate);
    // dayTwo.setDate(chosenDate.getDate() + 1);
    const dayTwoDateObj = Object.assign(emptyDateObject, { date: dayTwo });
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
                    {dayOneStats.data && dayTwoStats.data && (
                        <Carousel
                            key={1}
                            // data={test.data}
                            data={[
                                ...dayOneStats.data,
                                dayTwoDateObj,
                                ...dayTwoStats.data,
                            ]}
                            // meta={dayOneStats.meta}
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
