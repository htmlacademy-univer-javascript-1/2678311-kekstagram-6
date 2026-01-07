import { TIMEOUT_DELAY } from './consts.js';

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function debounce(callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomInteger, debounce };
