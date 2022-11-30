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

  const date = new Date();
  date.setDate(date.getDate() - 1);
  const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  useEffect(() => {
    axios.get(baseURL + "?dates[]=" + dateStr).then((response) => {
      setTest(response.data)
    })
  }, [])

  console.log('here')
  console.log(test)

  function handleClick() {
    console.log('haha')
  }


  return (
    <div className="App">
      <Carousel
        key={1}
        data={test.data}
        meta={test.meta}
        handleClick={handleClick}
      />
    </div>
  )
}

export default App
