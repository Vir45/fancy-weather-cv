function checkZero(value) {
  if (value < 10) {
    value = '0' + value;
  }
  return value;
}

function getTime(obj) {
  let currentTime = new Date();
  let month = obj.arrOfMonth[currentTime.getMonth()];
  let day = obj.arrOfShortDay[currentTime.getDay()];
  let date = checkZero(currentTime.getDate());
  let hours = currentTime.getHours();
  let minutes = checkZero(currentTime.getMinutes());
  let result = `${day} ${date} ${month}  ${hours}:${minutes}`;
  return result;
}

function controlWeek(value) {
  if (value < 7) {
    return value
  }
  if (value > 6) {
    return value - 7
  }
}

function getSeason(obj) {
  let currentTime = new Date();
  const month = obj.arrOfMonth[currentTime.getMonth()];
  return month;
}

function convert(value) {
  return Math.round((value - 32) / 1.8)
}

const dataEnglish = {
  lang: 'en',
  'FEELS LIKE': 'FEELS LIKE',
  WIND: 'WIND',
  HUMIDITY: 'HUMIDITY',
  arrOfDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  arrOfShortDay: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
  arrOfMonth: ['January', 'February', 'March', 'April', 'Мay', 'June', 'Julius', 'August', 'September', 'October', 'November', 'December'],
  latitude: 'Latitude',
  longitude: 'Longitude',
}

export { getTime, controlWeek, getSeason, convert, checkZero, dataEnglish }