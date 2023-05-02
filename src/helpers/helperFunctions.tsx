import {
    playerStatsDataType,
    basketballData,
    cachedBasketballDataType,
    cachedBoxscoreDataType,
} from '../types/basketballdata';
import { daysList, monthsList } from './helperData';

function minutesSort(a: playerStatsDataType, b: playerStatsDataType) {
    return parseInt(b.min) - parseInt(a.min);
}

function formatTimeInET(dateString: string) {
    if (dateString.endsWith('Z')) {
        const date = new Date(dateString);
        const estTime = date.toLocaleTimeString('en-US', {
            timeZone: 'America/New_York',
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short',
        });
        return estTime;
    } else {
        return dateString;
    }
}

function gameStartTimeSort(a: basketballData, b: basketballData) {
    // a/b object will have a status which will be a string: XX:XX PM EST
    // Get the time part only XX:XX
    const timeA = a.status.split(' ')[0];
    const timeB = b.status.split(' ')[0];
    // Split around the colons, hours and minutes
    const [hourA, minuteA] = timeA.split(':').map(Number);
    const [hourB, minuteB] = timeB.split(':').map(Number);
    // Convert 24 hour to 12 and then convert all to minutes for sorting.
    const timeValueA =
        hourA >= 12 ? (hourA - 12) * 60 + minuteA : hourA * 60 + minuteA;
    const timeValueB =
        hourB >= 12 ? (hourB - 12) * 60 + minuteB : hourB * 60 + minuteB;

    return timeValueA - timeValueB;
}

function formatAPIDate(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function formatDropdownDate(date: Date) {
    return `${daysList[date.getDay()]}, ${
        monthsList[date.getMonth()]
    } ${date.getDate()}`;
}

function getCachedScoreData(date: Date, cache: cachedBasketballDataType) {
    if (cache[date.toLocaleDateString()]) {
        const res = cache[date.toLocaleDateString()];
        res.data.map((item: basketballData) => {
            item.dateObj = false;
            item.status = formatTimeInET(item.status);
        });
        return res;
    }
    return false;
}

function getCachedBoxscoreData(id: number, cache: cachedBoxscoreDataType) {
    if (cache[id]) {
        const res = cache[id];
        return res;
    }
    return false;
}

export {
    formatAPIDate,
    formatDropdownDate,
    formatTimeInET,
    gameStartTimeSort,
    getCachedScoreData,
    getCachedBoxscoreData,
    minutesSort,
};
