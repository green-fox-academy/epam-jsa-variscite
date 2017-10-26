const ONE = 1;

function formatDate(dateToFormat) {
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
  let time = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
  ];
  let year = dateToFormat.getFullYear();
  let month = months[dateToFormat.getMonth()];
  let date = dates[dateToFormat.getDate() - ONE];
  let hour = dateToFormat.getHours();
  let min = time[dateToFormat.getMinutes()];

  return date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min;
}

export default formatDate;
