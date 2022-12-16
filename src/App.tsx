import { useState, useEffect } from 'react';
import './App.css';
import BoxScore from './components/BoxScore/BoxScore';
import Carousel from './components/Carousel/Carousel';
import emptyDateObject from './types/basketballdata';
import {
    basketballDataType,
    basketballData,
    boxscoreDataType,
    playerStatsDataType,
} from './types/basketballdata';
import axios from 'axios';

const baseURL = 'https://www.balldontlie.io/api/v1/games';
const baseGameURL =
    'https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]=';

function App() {
    const [test, setTest] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [todayStats, setTodayStats] = useState<basketballDataType>(
        {} as basketballDataType
    );
    const [currentGameID, setCurrentGameID] = useState<number>(0);
    //TODO implement this instead of homeTeam/ awayTeam
    const [currentGameData, setCurrentGameData] = useState<boxscoreDataType>(
        {} as boxscoreDataType
    );
    const [homeTeamData, setHomeTeamData] = useState<boxscoreDataType>(
        {} as boxscoreDataType
    );
    const [awayTeamData, setAwayTeamData] = useState<boxscoreDataType>(
        {} as boxscoreDataType
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
                    console.log(
                        home_team_id,
                        home_team,
                        away_team_id,
                        away_team
                    );
                    setHomeTeamData(home_team);
                    setAwayTeamData(away_team);
                }
            });
    }, [currentGameID]);

    function selectGameClick(id: number) {
        setCurrentGameID(id);
    };


    const todayDateObj = Object.assign(emptyDateObject, { date: today });
    return (
        <div className="App">
            {test.data && todayStats.data && (
                <Carousel
                    key={1}
                    // data={test.data}
                    data={[...test.data, todayDateObj, ...todayStats.data]}
                    meta={test.meta}
                    handleClick={selectGameClick}
                />
            )}
            {/* BoxScore --> App --> splits home/away inside component? */}
            <div className="boxscore-containers">
                {currentGameID !== 0 && awayTeamData && (
                    <BoxScore data={awayTeamData} />
                )}
                {currentGameID !== 0 && homeTeamData && (
                    <BoxScore data={homeTeamData} />
                )}
            </div>
        </div>
    );
}

export default App;
