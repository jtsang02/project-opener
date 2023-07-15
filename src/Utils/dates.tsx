import moment from 'moment';

function formatDate(dateString: string | Date) {
    return moment(dateString).format('MMMM D, YYYY');
}

function compareDates(date1: Date, date2: Date) {
    // 2023-06-26T23:00:49+9:00 -> 2023-06-26
    const date1Str = formatDate(date1);
    const date2Str = formatDate(date2);
    // compoare if date1 is greater than date2
    return date1Str.localeCompare(date2Str) > 0;
}


// export both functions
export { formatDate, compareDates };