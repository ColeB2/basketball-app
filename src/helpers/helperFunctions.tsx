import { playerStatsDataType } from '../types/basketballdata';

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

export { formatTimeInET, minutesSort };
