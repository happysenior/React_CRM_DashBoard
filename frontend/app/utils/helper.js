function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (
    date.getMonth() +
    1 +
    '/' +
    date.getDate() +
    '/' +
    date.getFullYear() +
    '  ' +
    strTime
  );
}

function roundFormatDate(date) {
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var now = new Date();

  var currentYear = now.getFullYear();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  if (currentYear === year) {
    return monthNames[monthIndex] + ' ' + day;
  }
  return monthNames[monthIndex] + ' ' + day + ' ' + year;
}

export { formatDate, roundFormatDate };
