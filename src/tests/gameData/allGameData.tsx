import { dayOne } from './dayOneGameData';
import { dayTwo } from './dayTwoGameData';
import { dayThree } from './dayThreeGameData';
import { dayFour } from './dayFiveGameData';
import { dayFive } from './dayFourGameData';
import { daySix } from './daySixGameData';
import { daySeven } from './daySevenGameData';
import { getLast7Days } from '../../helpers/helperFunctions';
import { cachedBasketballDataType } from '../../types/basketballdata';

const dates = getLast7Days();

// const dayData = [dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven];
const dayData = [daySeven, daySix, dayFive, dayFour, dayThree, dayTwo, dayOne];
const mockGameData = {} as cachedBasketballDataType;
console.log(dates.toLocaleString());

dates.forEach((date, i) => {
    mockGameData[date.toLocaleDateString()] = dayData[i];
});

export default mockGameData;
