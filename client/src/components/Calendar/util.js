import dayjs from 'dayjs'

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);

    const year = dayjs().year();

    const firstDay = dayjs(new Date(year, month, 1)).day();

    let currentMonthC = 0 - firstDay
    
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthC++
            return dayjs(new Date(year, month, currentMonthC));
        });
    });
    return daysMatrix
}