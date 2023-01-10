import { playerStatsDataType } from '../types/basketballdata';

function minutesSort(a: playerStatsDataType, b: playerStatsDataType) {
    return parseInt(b.min) - parseInt(a.min);
}

export { minutesSort };
