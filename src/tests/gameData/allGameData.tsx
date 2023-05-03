import { dayOne } from './dayOneGameData';
import { dayTwo } from './dayTwoGameData';
import { dayThree } from './dayThreeGameData';
import { dayFour } from './dayFiveGameData';
import { dayFive } from './dayFourGameData';
import { daySix } from './daySixGameData';
import { daySeven } from './daySevenGameData';
import { dayEight } from './dayEightGameData';
import { getLast7Days } from '../../helpers/helperFunctions';
import { cachedBasketballDataType } from '../../types/basketballdata';

const dates = [new Date(), ...getLast7Days()];
const dayData = [
    daySeven,
    daySix,
    dayEight,
    dayFive,
    dayFour,
    dayThree,
    dayTwo,
    dayOne,
];
const mockGameData = {} as cachedBasketballDataType;

dates.forEach((date, i) => {
    mockGameData[date.toLocaleDateString()] = dayData[i];
});

export default mockGameData;
