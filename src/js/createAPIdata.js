import mapboxgl from 'mapbox-gl';
import {
  controlWeek,
  getSeason,
  convert
} from './getTime';
import { checkIcon, arrOfIcon, geo_options } from './index'

export const dataEnglish = {
  lang: 'en',
  'FEELS LIKE': 'FEELS LIKE',
  WIND: 'WIND',
  HUMIDITY: 'HUMIDITY',
  arrOfDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  arrOfShortDay: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
  arrOfMonth: ['January', 'February', 'March', 'April', 'Мay', 'June', 'Julius', 'August', 'September', 'October', 'November', 'December'],
  latitude: 'Latitude',
  longitude: 'Longitude',
  yandexCodeLang: 'en_RU',
}

export const dataRussian = {
  lang: 'ru',
  'FEELS LIKE': 'Ощущается как',
  WIND: 'Сила ветра',
  HUMIDITY: 'Влажность',
  arrOfDay: ['Воскресение', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  arrOfShortDay: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  arrOfMonth: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
  latitude: 'Широта',
  longitude: 'Долгота',
  yandexCodeLang: 'ru_RU',
}

export const dataBelarusian = {
  lang: 'be',
  'FEELS LIKE': 'Адчуваецца як',
  WIND: 'Сiла ветру',
  HUMIDITY: 'Вільготнасць',
  arrOfDay: ['Нядзеля', 'Панядзелак', 'Аўторак', 'Серада', 'Чацьвер', 'Пятніца', 'Сыбота'],
  arrOfShortDay: ['Нс', 'Пн', 'Аў', 'Ср', 'Чц', 'Пт', 'Сб'],
  arrOfMonth: ['Студзеня', 'Лютага', 'Сакавiка', 'Красавiка', 'Мая', 'Чэрвеня', 'Лiпеня', 'Жнiвеня', 'Верасня', 'Кастрычнiка', 'Лiстапада', 'Снежня'],
  latitude: 'Шырата',
  longitude: 'Даўгата',
  yandexCodeLang: 'be_BY',
}


export function geoFindMe(obj) {

  function sucsses(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let lat = String(latitude).slice(0, 7);
    let lng = String(longitude).slice(0, 7);

    /////////////////////////////////////Weather/////////////////////////////////////////////////////////////////////

    const darkskyToken = '4c95abfb6faccbf0e7dc31a4ecd3a2b6';
    const urlDarksky = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkskyToken}/${lat},${lng}?lang=${obj.lang}`;
    async function getAPIWeather() {
      let res = await fetch(urlDarksky);
      let data = await res.json();
      return data;
    }

    function getWeather() {
      getAPIWeather().then(data => {
        if (localStorage.getItem('degree') === 'c' || localStorage.getItem('degree') === null) {
          document.querySelector('.current-temperature p').innerHTML = `${convert(data.currently.temperature)}`;
        } else if (localStorage.getItem('degree') === 'f') {
          document.querySelector('.current-temperature p').innerHTML = `${Math.round(data.currently.temperature)}`;
        }
        document.querySelector('.degree').innerHTML = "&#176"
        document.querySelector('.description-weather p').innerHTML = `${data.currently.summary.toUpperCase()}<br>${obj['FEELS LIKE']}: ${convert(data.currently.apparentTemperature)}&#176<br>${obj['WIND']}: ${data.currently.windSpeed}m/s<br>${obj['HUMIDITY']}: ${data.currently.humidity * 100}%`;
        let descriotionWeather = data.currently.summary;

        const currentIcon = new Image();
        const APICurrentIcon = data.currently.icon;
        currentIcon.src = checkIcon(arrOfIcon, APICurrentIcon);
        document.querySelector('.icon-current').prepend(currentIcon);

        let currentTime = new Date();
        let timeOfSutki = 'day';
        if (currentTime.getHours() >= 19) {
          timeOfSutki = 'night'
        }

        if (localStorage.getItem('degree') === 'c' || localStorage.getItem('degree') === null) {
          document.querySelector('.next-one').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 1)]}</span><br><span class="next-one-temperature">${convert((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) /2 )}</span>&#176`;
          document.querySelector('.next-two').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 2)]}</span><br><span class="next-two-temperature">${convert((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) /2 )}</span>&#176`;
          document.querySelector('.next-three').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 3)]}</span><br><span class="next-three-temperature">${convert((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) /2 )}</span>&#176`;
        } else if (localStorage.getItem('degree') === 'f') {
          document.querySelector('.next-one').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 1)]}</span><br><span class="next-one-temperature">${Math.round((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) /2 )}</span>&#176`;
          document.querySelector('.next-two').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 2)]}</span><br><span class="next-two-temperature">${Math.round((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) /2 )}</span>&#176`;
          document.querySelector('.next-three').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentTime.getDay() + 3)]}</span><br><span class="next-three-temperature">${Math.round((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) /2 )}</span>&#176`;
        }

        const iconNextOne = new Image();
        const APICIconNextOne = data.daily.data[0].icon;
        iconNextOne.src = checkIcon(arrOfIcon, APICIconNextOne);
        document.querySelector('.next-one').append(iconNextOne);

        const iconNextTwo = new Image();
        const APICIconNextTwo = data.daily.data[1].icon;
        iconNextTwo.src = checkIcon(arrOfIcon, APICIconNextTwo);
        document.querySelector('.next-two').append(iconNextTwo);

        const iconNextThree = new Image();
        const APICIconNextThree = data.daily.data[2].icon;
        iconNextThree.src = checkIcon(arrOfIcon, APICIconNextThree);
        document.querySelector('.next-three').append(iconNextThree);
        const place = data.timezone.slice(data.timezone.indexOf('/') + 1);

        ///////////////////////////////////////////////Image background////////////////////////////////////////////////////
        const mounth = getSeason(obj);
        const accessKey = '89af14d56fc41567b9ad9861d2efdc32fa5ccfc89246b4fd974843dfc0a8a3f5';
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${mounth},${place},${descriotionWeather},${timeOfSutki}&client_id=${accessKey}`;

        async function getLinkToImage() {
          let res = await fetch(url);
          let data = await res.json();
          return data.urls.small;
        }

        function changeBackground() {
          getLinkToImage().then(item => {
            document.querySelector('.wrapper').style.backgroundImage = `url(${item})`;
          })
        }
        document.querySelector('.refresh-background').addEventListener('click', changeBackground);

        changeBackground();
      })
    }

    getWeather()

    //////////////////////////////////Create Map///////////////////////////////////////////////////////////////////////////////////////
    document.querySelector('.data-location').innerHTML = `${obj.latitude}: ${String(latitude).slice(0, 2)}°${String(latitude).slice(3, 5)}'<br>${obj.longitude}: ${String(longitude).slice(0, 2)}°${String(longitude).slice(3, 5)}'`

    mapboxgl.accessToken = 'pk.eyJ1Ijoidm92YTAxMyIsImEiOiJjazNha2Y2MHEwOWE0M2dsZHprYzJwNmI0In0.4tU2OcH0O-plxljActzq2A';

    /* eslint-disable no-unused-vars */
    let map = new mapboxgl.Map({
      container: 'maps', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [longitude, latitude], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });
    /* eslint-disable no-unused-vars */
  }

  function error() {
    document.querySelector('.data-location').innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(sucsses, error, geo_options);
}