function createDomeElement() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('wrapper');
  document.body.prepend(wrapper);


  const controlBlock = document.createElement('div');
  controlBlock.classList.add('control-block');
  document.querySelector('.wrapper').prepend(controlBlock);


  const changesBlock = document.createElement('div');
  changesBlock.classList.add('changes-block');
  document.querySelector('.control-block').prepend(changesBlock);

  const buttonRefreshBackground = document.createElement('button');
  buttonRefreshBackground.classList.add('refresh-background');
  document.querySelector('.changes-block').prepend(buttonRefreshBackground);

  const selectLanguage = document.createElement('select');
  selectLanguage.classList.add('select-language');
  selectLanguage.setAttribute('name', 'select');
  if (localStorage.getItem('lang') === 'en' || localStorage.getItem('lang') === null) {
    selectLanguage.insertAdjacentHTML('afterbegin', '<option value="1" selected>EN</option><option value="2">RU</option><option value="3">BE</option>');
  } else if (localStorage.getItem('lang') === 'ru') {
    selectLanguage.insertAdjacentHTML('afterbegin', '<option value="1">EN</option><option value="2" selected>RU</option><option value="3">BE</option>');
  } else if (localStorage.getItem('lang') === 'be') {
    selectLanguage.insertAdjacentHTML('afterbegin', '<option value="1">EN</option><option value="2">RU</option><option value="3" selected>BE</option>');
  }
  document.querySelector('.changes-block').append(selectLanguage);

  const buttonFahrenheit = document.createElement('button');
  buttonFahrenheit.classList.add('fahrenheit');
  if (localStorage.getItem('degree') === 'f') {
    buttonFahrenheit.classList.add('active-degree');
  }
  buttonFahrenheit.innerHTML = '&#176F'
  document.querySelector('.changes-block').append(buttonFahrenheit);


  const buttonCelsius = document.createElement('button');
  buttonCelsius.classList.add('celsius');
  if (localStorage.getItem('degree') === 'c' || localStorage.getItem('degree') === null) {
    buttonCelsius.classList.add('active-degree');
  }
  buttonCelsius.innerHTML = '&#176C';
  document.querySelector('.changes-block').append(buttonCelsius);

  const searchBlock = document.createElement('div');
  searchBlock.classList.add('search-block');
  document.querySelector('.control-block').append(searchBlock);

  const inputTown = document.createElement('input');
  inputTown.classList.add('input-city');
  inputTown.setAttribute('type', 'text');
  inputTown.setAttribute('placeholder', 'Search city or ZIP');
  document.querySelector('.search-block').prepend(inputTown);


  const buttonVoice = document.createElement('button');
  buttonVoice.classList.add('voice-button');
  document.querySelector('.search-block').append(buttonVoice);

  const buttonSearch = document.createElement('button');
  buttonSearch.classList.add('search-button');
  buttonSearch.innerHTML = 'SEARCH';
  document.querySelector('.search-block').append(buttonSearch);


  const mainblock = document.createElement('div');
  mainblock.classList.add('main-block');
  document.querySelector('.wrapper').append(mainblock);

  const aboutPlace = document.createElement('div');
  aboutPlace.classList.add('about-place');
  document.querySelector('.main-block').prepend(aboutPlace);

  const currentLocation = document.createElement('p');
  currentLocation.classList.add('current-location');
  document.querySelector('.about-place').prepend(currentLocation);

  const time = document.createElement('p');
  time.classList.add('current-time');
  document.querySelector('.about-place').append(time);

  const blockCurrentweater = document.createElement('div');
  blockCurrentweater.classList.add('block-current-weater');
  blockCurrentweater.insertAdjacentHTML('afterbegin', '<div class="current-temperature"><p></p><span class="degree"></span></div>  <div class="description-weather"><div class="icon-current"></div><p></p></div>');
  document.querySelector('.about-place').append(blockCurrentweater);

  const weatherNextDay = document.createElement('div');
  weatherNextDay.classList.add('weather-next-day');
  weatherNextDay.insertAdjacentHTML('afterbegin', '<p class="next-one"></p><p class="next-two"></p><p class="next-three"></p>')
  document.querySelector('.about-place').append(weatherNextDay);

  const geoLocationOfPlace = document.createElement('div');
  geoLocationOfPlace.classList.add('geolocation-of-place');
  document.querySelector('.main-block').append(geoLocationOfPlace);

  const pictureOfMap = document.createElement('div');
  pictureOfMap.setAttribute('id', 'maps');
  document.querySelector('.geolocation-of-place').prepend(pictureOfMap);

  const dataofLocation = document.createElement('p');
  dataofLocation.classList.add('data-location');
  document.querySelector('.geolocation-of-place').append(dataofLocation);

}

export default createDomeElement;