function convertDateToISO(date) {
    if (!date) return date;
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
}

module.exports = {
    convertDateToISO
}