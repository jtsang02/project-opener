import moment from 'moment';

function formatDate(dateString: string | Date) {
    return moment(dateString).format('MMMM D, YYYY');
}

function compareDates(date1: Date, date2: Date) {
    // 2023-06-26T23:00:49+9:00 -> 2023-06-26
    return moment(date1).isAfter(date2);
}


// export both functions
export { formatDate, compareDates };