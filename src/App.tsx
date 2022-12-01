import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import Carousel from './components/Carousel';
import {basketballDataType} from './types/basketballdata'
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
      setTest(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(baseURL + "?dates[]=" + todayStr).then((response) => {
      setTodayStats(response.data)
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


  return (
    <div className="App">
    {test.data && todayStats.data &&
      <Carousel
        key={1}
        // data={test.data}
        data={[...test.data, ...todayStats.data]}
        meta={test.meta}
        handleClick={handleClick}
      />
    }
    </div>
  )
}

export default App
