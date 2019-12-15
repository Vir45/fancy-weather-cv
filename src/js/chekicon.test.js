window.URL.createObjectURL = function() {};
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;


const state = require('./getTime');


test('it should conver temperature', () => {
  expect(state.convert(38)).toBe(3);
})

test('it should return day of week', () => {
  expect(state.controlWeek(12)).toBe(5);
})

test('it should return two-digit value', () => {
  expect(state.checkZero(5)).toBe('05');
})

test('it should check availability key in object', () => {
  expect(state.dataEnglish).toHaveProperty('lang');
})

test('it should check string matches regex', () => {
  expect(state.getSeason(state.dataEnglish)).toEqual(expect.stringMatching(/\w/));
})

test('it should check matches any values', () => {
  expect(state.getSeason(state.dataEnglish)).toEqual(expect.anything());
})

test('it should check value was created using this constructor', () => {
  expect(state.controlWeek(12)).toEqual(expect.any(Number));
})

test('it should check availability object not caontain key "langs"', () => {
  expect(state.dataEnglish).not.toBe('langs');
})

test('it should check that value of key arrOfDay contain "Maonday"', () => {
  expect(state.dataEnglish.arrOfDay).toContain('Monday');
})

test('it should check that object has length property', () => {
  expect(state.dataEnglish.arrOfDay).toHaveLength(7);
})