import mapboxgl from 'mapbox-gl';
import fog from "../image/fog.svg";
import rain from "../image/rain.svg";
import sleet from "../image/sleet.svg";
import snow from "../image/snow.svg";
import wind from "../image/wind.svg";
import clearday from "../image/clear-day.svg";
import clearnight from "../image/clear-night.svg";
import cloudy from "../image/cloudy.svg";
import partlycloudynight from "../image/partly-cloudy-night.svg";
import partlycloudyday from "../image/partly-cloudy-day.svg";
import voice from "../image/microphone.svg"
import { changeDegreeToFareng, changeDegreeCelcies } from './chekdegree';
import displayAboutCity from './findforadress';
import createDomeElement from './createDom';
import {
  getTime,
} from './getTime';
import { geoFindMe, dataEnglish, dataBelarusian, dataRussian } from './createAPIdata';

export const arrOfIcon = [];

arrOfIcon.push({
  'fog': fog
});

arrOfIcon.push({
  'rain': rain
});

arrOfIcon.push({
  'sleet': sleet
});

arrOfIcon.push({
  'snow': snow
});

arrOfIcon.push({
  'wind': wind
});

arrOfIcon.push({
  'clear-day': clearday
});

arrOfIcon.push({
  'clear-night': clearnight
});

arrOfIcon.push({
  'cloudy': cloudy
});

arrOfIcon.push({
  'partly-cloudy-night': partlycloudynight
});


arrOfIcon.push({
  'partly-cloudy-day': partlycloudyday
});

let objOfLanguage;

if (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === null) {
  objOfLanguage = dataEnglish;
} else if (localStorage.getItem('lang') === 'ru') {
  objOfLanguage = dataRussian;
} else if (localStorage.getItem('lang') === 'be') {
  objOfLanguage = dataBelarusian;
}

createDomeElement()
mapboxgl.accessToken = 'pk.eyJ1Ijoidm92YTAxMyIsImEiOiJjazNha2Y2MHEwOWE0M2dsZHprYzJwNmI0In0.4tU2OcH0O-plxljActzq2A';

const microphoneIcon = new Image();
microphoneIcon.src = voice;
document.querySelector('.voice-button').prepend(microphoneIcon)

///////////////////////////////////////////Get current weather and map///////////////////////////////////////

export const geo_options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

export function checkIcon(arrOfIcon, current) {
  const arrOfKey = [];
  for (let i = 0; i < arrOfIcon.length; i++) {
    let valueKey;
    for (let key in arrOfIcon[i]) {
      valueKey = key;
    }
    arrOfKey.push(valueKey)
  }
  let desired = arrOfKey.find(item => item == current);
  let posittion = arrOfKey.indexOf(desired);
  let obj = arrOfIcon[posittion];
  return Object.values(obj).join();
}

export function convert(value) {
  return Math.round((value - 32) / 1.8)
}

geoFindMe(objOfLanguage);

///////////////////////////////Current time///////////////////////

document.querySelector('.current-time').innerHTML = getTime(objOfLanguage);

export let timerId = setInterval(function() {
  if (document.querySelector('.current-time')) {
    document.querySelector('.current-time').innerHTML = getTime(objOfLanguage);
  }
}, 1000);

/////////////////////////////////Current place//////////////////////////////////////

const tokenIpiinfo = '941ae0fd6067fc';
async function getIpiinfo() {
  let url = `https://ipinfo.io/json?token=${tokenIpiinfo}`;
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

export function getLocatin() {
  getIpiinfo().then(data => {
    if (document.querySelector('.current-location')) {
      document.querySelector('.current-location').innerHTML = `${data.city}, ${data.country}`;
    }
  })
}

getLocatin()

/////////////////////Changedegree///////////////////////////
document.querySelector('.fahrenheit').addEventListener('click', changeDegreeToFareng);
document.querySelector('.celsius').addEventListener('click', changeDegreeCelcies);

/////////////////////////////////Search data about city/////////////////////////////////////////////////////////////////////

document.querySelector('.search-button').addEventListener('click', displayAboutCity);

////////////////////////Create Web Speech API//////////////////////
const WebkitSpeechRecognition = window.webkitSpeechRecognition || window.speechRecognition;
const webkitSpeechRecognition = new WebkitSpeechRecognition();
webkitSpeechRecognition.interimResults = true;
webkitSpeechRecognition.lang = 'en-US';
webkitSpeechRecognition.onresult = function(event) {
  const result = event.results[event.resultIndex];
  if (result.isFinal) {
    document.querySelector('.input-city').value = '';
    displayAboutCity(result[0].transcript);
    document.querySelector('.input-city').value = result[0].transcript;
  }
};

function start(event) {
  if (!event.target.closest('.voice-button')) {
    return
  }
  webkitSpeechRecognition.start();
}
document.querySelector('.voice-button').addEventListener('click', start);

////////////////////////Chages Language//////////////////////

function helperWithSelected(obj) {
  if (document.querySelector('.input-city').value) {
    displayAboutCity();
  } else {
    if (document.querySelector('.icon-current img')) {
      document.querySelector('.icon-current img').remove()
    }
    if (document.querySelector('.current-locations')) {
      document.querySelector('.current-locations').remove();
      const currentLocation = document.createElement('p');
      currentLocation.classList.add('current-location');
      document.querySelector('.about-place').prepend(currentLocation);
    }
    getLocatin();
    geoFindMe(obj);
    clearInterval(timerId);
    document.querySelector('.current-time').innerHTML = getTime(obj);
    timerId = setInterval(function() {
      if (document.querySelector('.current-time')) {
        document.querySelector('.current-time').innerHTML = getTime(obj);
      }
    }, 1000);
  }
}

document.querySelector('.select-language').addEventListener('change', function() {
  if (this.value === '1') {
    localStorage.setItem('lang', 'en');
    helperWithSelected(dataEnglish);
  } else if (this.value === '2') {
    localStorage.setItem('lang', 'ru');
    helperWithSelected(dataRussian);
  } else if (this.value === '3') {
    localStorage.setItem('lang', 'be');
    helperWithSelected(dataBelarusian);
  }
})