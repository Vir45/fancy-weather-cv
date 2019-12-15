export function changeDegreeToFareng() {
  if (document.querySelector('.fahrenheit').classList.contains('active-degree')) {
    this.blur();
    return
  }

  document.querySelector('.celsius').classList.remove('active-degree');
  document.querySelector('.fahrenheit').classList.add('active-degree');
  document.querySelector('.current-temperature p').innerHTML = Math.floor((document.querySelector('.current-temperature p').innerHTML * 9 / 5) + 32);

  document.querySelector('.next-one-temperature').innerHTML = Math.floor((document.querySelector('.next-one-temperature').innerHTML * 9 / 5) + 32);
  document.querySelector('.next-one-temperature').classList.add('current-temperature-next-f');
  console.log(document.querySelector('.next-one-temperature').classList)
  document.querySelector('.next-two-temperature').innerHTML = Math.floor((document.querySelector('.next-two-temperature').innerHTML * 9 / 5) + 32);
  document.querySelector('.next-one-temperature').classList.add('current-temperature-next-f');
  document.querySelector('.next-three-temperature').innerHTML = Math.floor((document.querySelector('.next-three-temperature').innerHTML * 9 / 5) + 32);
  document.querySelector('.next-one-temperature').classList.add('current-temperature-next-f');
  this.blur();
  localStorage.setItem('degree', 'f')

}

export function changeDegreeCelcies() {
  if (document.querySelector('.celsius').classList.contains('active-degree')) {
    this.blur();
    return
  }

  document.querySelector('.celsius').classList.add('active-degree');
  document.querySelector('.fahrenheit').classList.remove('active-degree');
  document.querySelector('.current-temperature p').innerHTML = Math.round((document.querySelector('.current-temperature p').innerHTML - 32) / 1.8);
  document.querySelector('.next-one-temperature').innerHTML = Math.round((document.querySelector('.next-one-temperature').innerHTML - 32) / 1.8);
  document.querySelector('.next-one-temperature').classList.add('current-temperature-next-c');
  document.querySelector('.next-two-temperature').innerHTML = Math.round((document.querySelector('.next-two-temperature').innerHTML - 32) / 1.8);
  document.querySelector('.next-two-temperature').classList.add('current-temperature-next-c');
  document.querySelector('.next-three-temperature').innerHTML = Math.round((document.querySelector('.next-three-temperature').innerHTML - 32) / 1.8);
  document.querySelector('.next-three-temperature').classList.add('current-temperature-next-c');
  this.blur();
  localStorage.setItem('degree', 'c')

}

export function checkWeatherDescription(str) {
  if (str.match(/\p{Lu}/u)) {
    const uppercaseLetter = str.match(/\p{Lu}/u).join('');
    const index = str.indexOf(uppercaseLetter);
    const arr = str.split('');
    arr.splice(index, 0, ' ');
    return arr.join('');
  }
  return str
}