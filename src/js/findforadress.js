import mapboxgl from 'mapbox-gl';
import {
  controlWeek,
  getSeason,
  convert
} from './getTime';
import { checkIcon, arrOfIcon, getLocatin, timerId } from './index';
import { dataEnglish, dataRussian } from './createAPIdata';


function displayAboutCity(adress) {
  let obj;
  if (localStorage.getItem('lang') === 'be') {
    alert("Intl dont work with Belarusian")
    obj = dataRussian;
  }
  if (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === null) {
    obj = dataEnglish;
  } else if (localStorage.getItem('lang') === 'ru' || localStorage.getItem('lang') === 'be') {
    obj = dataRussian;
  }

  const yandexKey = "03342ebc-5fa9-454e-b59e-577fc2b9de5b";
  const city = document.querySelector('.input-city').value;
  if (city) {
    adress = city;
  }

  async function yandexGeoCoder() {
    let url = `https://cors-anywhere.herokuapp.com/https://geocode-maps.yandex.ru/1.x/?apikey=${yandexKey}&format=json&geocode=${adress}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
  }


  function getLagLat() {
    yandexGeoCoder().then(data => {
      const indexOfEmptyMark = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.indexOf(' ');
      const longitude = +data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(0, indexOfEmptyMark);
      const latitude = +data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.slice(indexOfEmptyMark + 1);
      const lng = String(data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos).slice(0, 7);
      const lat = String(data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos).slice(indexOfEmptyMark + 1, 17);
      if (document.querySelector('.current-location')) {
        document.querySelector('.current-location').remove();
      }
      if (document.querySelector('.current-locations')) {
        document.querySelector('.current-locations').remove();
      }

      const currentLocation = document.createElement('p');
      currentLocation.classList.add('current-locations');
      document.querySelector('.about-place').prepend(currentLocation);
      document.querySelector('.current-locations').innerHTML = `${data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request}`;

      function addZero(str) {
        if (str.length < 8) {
          while (str.length < 8) {
            str += '0'
          }
        }
        return str
      }

      const town = data.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.request;
      /////////////////////////////////////Weather/////////////////////////////////////////////////////////////////////

      const darkskyToken = '6308687587c9f5012f0b4849eef094e9';
      const urlDarksky = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkskyToken}/${addZero(lat)},${addZero(lng)}?lang=${obj.lang}`
      async function getAPIWeather() {
        getLocatin();
        let res = await fetch(urlDarksky);
        let data = await res.json();
        return data;
      }

      function getWeather() {
        getAPIWeather().then(data => {
          let currentTime = new Date();
          let langForOptions;
          if (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === null) {
            langForOptions = 'en-GB';
          } else if (localStorage.getItem('lang') === 'ru' || localStorage.getItem('lang') === 'be') {
            langForOptions = 'ru';
          }

          const options = (langForOptions, { timeZone: data.timezone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
          const optionForHour = { timeZone: data.timezone, hour: 'numeric' };
          const optionForWeekday = { timeZone: data.timezone, weekday: 'long' };
          let timeOfSutki = 'day';
          if (Number(currentTime.toLocaleString(langForOptions, optionForHour)) >= 19) {
            timeOfSutki = 'night'
          }
          const currentIndexDayOfWeek = obj.arrOfDay.indexOf(currentTime.toLocaleString(langForOptions, optionForWeekday)[0].toUpperCase() + currentTime.toLocaleString(langForOptions, optionForWeekday).slice(1));

          clearInterval(timerId);

          function getTime() {
            return currentTime.toLocaleString(langForOptions, options)
          }

          document.querySelector('.current-time').innerHTML = getTime(obj);

          if (localStorage.getItem('degree') === 'c' || localStorage.getItem('degree') === null) {
            document.querySelector('.current-temperature p').innerHTML = `${convert(data.currently.temperature)}`;
          } else
          if (localStorage.getItem('degree') === 'f') {
            document.querySelector('.current-temperature p').innerHTML = `${Math.round(data.currently.temperature)}`;
          }
          document.querySelector('.degree').innerHTML = "&#176"
          document.querySelector('.description-weather p').innerHTML = `${data.currently.summary.toUpperCase()}<br>${obj['FEELS LIKE']}: ${convert(data.currently.apparentTemperature)}&#176<br>${obj['WIND']}: ${data.currently.windSpeed}m/s<br>${obj['HUMIDITY']}: ${data.currently.humidity * 100}%`;
          let descriotionWeather = data.currently.summary;

          const currentIcon = new Image();
          const APICurrentIcon = data.currently.icon;
          currentIcon.src = checkIcon(arrOfIcon, APICurrentIcon);
          document.querySelector('.icon-current img').remove();
          document.querySelector('.icon-current').prepend(currentIcon);

          if (localStorage.getItem('degree') === 'c' || localStorage.getItem('degree') === null) {
            document.querySelector('.next-one').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentIndexDayOfWeek + 1)]}</span><br><span class="next-one-temperature">${convert((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) /2 )}</span>&#176`;
            document.querySelector('.next-two').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentIndexDayOfWeek + 2)]}</span><br><span class="next-two-temperature">${convert((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) /2 )}</span>&#176`;
            document.querySelector('.next-three').innerHTML = `<span>${obj.arrOfDay[controlWeek(currentIndexDayOfWeek + 3)]}</span><br><span class="next-three-temperature">${convert((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) /2 )}</span>&#176`;
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

          ///////////// /////////////////////Image background//////////////////////////////////////////
          const mounth = getSeason(obj);
          const accessKey = '89af14d56fc41567b9ad9861d2efdc32fa5ccfc89246b4fd974843dfc0a8a3f5';
          const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${descriotionWeather},${mounth},${town},${timeOfSutki}&client_id=${accessKey}`;
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

      ///// //////////////////////Creat New Map//////////////////////////////////////////////////
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
    })
  }
  getLagLat()
    // this.blur();
}

export default displayAboutCity;