import {differenceInDays, differenceInHours, differenceInMinutes} from 'date-fns'

export const getTimeInProgress = (startDate: string) => {
    const now = new Date(Date.now());
    const start = new Date(startDate);
    const days = differenceInDays(now, start);
    const hours = differenceInHours(now, start) % 24;
    const mins = differenceInMinutes(now, start) % 60;

    const daysString = days ? days + `${days===1 ? ' day' : ' days'}` : '';
    const hoursString = hours ? hours + `${hours===1 ? ' hour' : ' hours'}` : '';
    const minsString = mins ? mins + `${mins===1 ? ' min' : ' mins'}` : '';

    const result = `${daysString} ${hoursString} ${minsString}`.trim()

    return result;
     
}