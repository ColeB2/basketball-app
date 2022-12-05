import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import BoxScore from './components/BoxScore';
import Carousel from './components/Carousel';
import emptyDateObject from './types/basketballdata'; 
import {basketballDataType, basketballData} from './types/basketballdata'
import axios from "axios";


const baseURL = "https://www.balldontlie.io/api/v1/games"
const baseGameURL = "https://www.balldontlie.io/api/v1/stats?per_page=100&game_ids[]="


function App() {
  const [count, setCount] = useState(0)

  // const [test, setTest] = useState([{}]);
  const [test, setTest] = useState<basketballDataType>({} as basketballDataType);
  const [todayStats, setTodayStats] = useState<basketballDataType>({} as basketballDataType);
  const [currentGameID, setCurrentGameID] = useState<number>(0 as number)

  const date = new Date();
  date.setDate(date.getDate() - 1);
  const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
  useEffect(() => {
    axios.get(baseURL + "?dates[]=" + dateStr).then((response) => {
      response.data.data.map((item: basketballData) => {
        item.dateObj = false;
      })
      setTest(response.data)
      console.log('rerunning')
    })
  }, [])

  useEffect(() => {
    axios.get(baseURL + "?dates[]=" + todayStr).then((response) => {
      response.data.data.map((item: basketballData) => {
        item.dateObj = false;
      })
      // TODO Work on sorting Today game data by start time.
      // Also work on implementing Time left in quarter.
      // console.log('Testing sorting data',response.data)
      // const todayData = [].concat(response.data.data)
        // .sort((a,b) => a["status"] < b["status"] ? 1 : -1)
      
      setTodayStats(response.data)
      console.log('rerunning')
    })
  }, [])

  useEffect(() => {
    axios.get(baseGameURL + currentGameID.toString()).then((response) => {
      console.log(response.data)
    })
  }, [currentGameID])

  


  function selectGameClick(id: number) {
    console.log('Click', id)
    setCurrentGameID(id)
  }




  let todayDateObj = Object.assign(emptyDateObject, {date:today})
  return (
    <div className="App">
    {test.data && todayStats.data &&
      <Carousel
        key={1}
        // data={test.data}
        data={[...test.data, todayDateObj, ...todayStats.data]}
        meta={test.meta}
        handleClick={selectGameClick}
      />
    }

    <BoxScore/>
    </div>
  )
}

export default App
