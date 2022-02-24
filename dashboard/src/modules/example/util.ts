function formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return month + '/' + day + '/' + year;
}

function formatTime(date: Date): string {
    const hours = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    const seconds = date.getSeconds().toString();
    return hours + ':' + minutes + ':' + seconds;
}

export function getTimeFormatString(timeStamp: number): string {
    const date = new Date(timeStamp * 1000);
    const dt = formatTime(date) + ' ' + formatDate(date);
    return dt;
}
