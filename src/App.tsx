import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import Carousel from './components/Carousel';
import emptyDateObject from './types/basketballdata'; 
import {basketballDataType, basketballData} from './types/basketballdata'
import axios from "axios";

const baseURL = "https://www.balldontlie.io/api/v1/games"


function App() {
  const [count, setCount] = useState(0)

  // const [test, setTest] = useState([{}]);
  const [test, setTest] = useState<basketballDataType>({} as basketballDataType);
  const [todayStats, setTodayStats] = useState<basketballDataType>({} as basketballDataType);

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
      // response.data.data = todayData
      // setTodayStats(response.data)
      // console.log(todayData)
    })
  }, [])

  // console.log('here', date, dateStr)
  console.log("test",test.data)
  console.log("todaystats", todayStats)
  test.data && todayStats.data && console.log("testy", ...test.data, ...todayStats.data)
  // let combinedData = [...test.data, ...todayStats.data]

  function handleClick() {
    console.log('haha')
  }

  console.log('EMPTY DATE OBJECT', emptyDateObject)
  let todayDateObj = Object.assign(emptyDateObject, {date:today})
  console.log('BEST', todayDateObj)


  return (
    <div className="App">
    {test.data && todayStats.data &&
      <Carousel
        key={1}
        // data={test.data}
        data={[...test.data, todayDateObj, ...todayStats.data]}
        meta={test.meta}
        handleClick={handleClick}
      />
    }
    </div>
  )
}

export default App
