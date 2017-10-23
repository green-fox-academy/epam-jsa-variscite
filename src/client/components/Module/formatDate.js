function formatDate(newDate) {
  let months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  let dates = [
    '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th',
    '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th',
    '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th',
    '26th', '27th', '28th', '29th', '30th', '31st',
  ];
  let year = newDate.getFullYear();
  let month = months[newDate.getMonth()];
  let date = dates[newDate.getDate() - 1];
  let hour = newDate.getHours();
  let min = newDate.getMinutes();

  return date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min;
}

export default formatDate;
