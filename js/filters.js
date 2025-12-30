import { createPictures, originalPictures, clearPictures } from './draw-picture.js';
import { getRandomInteger } from './util.js';
import { COUNT_RANDOM_PICTURES } from './consts.js';

const imgFiltersElement = document.querySelector('.img-filters');
const activeButtonClassName = 'img-filters__button--active';
const filterDefaultId = 'filter-default';
const filterRandomId = 'filter-random';
const filterDiscussedId = 'filter-discussed';
const buttonfilter = imgFiltersElement.querySelector(`#${filterDefaultId}`);
const buttonFilterRandom = imgFiltersElement.querySelector(`#${filterRandomId}`);
const buttonFilterDiscussed = imgFiltersElement.querySelector(`#${filterDiscussedId}`);

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const deactivateActiveFilter = () => {
  imgFiltersElement.querySelector(`.${activeButtonClassName}`).classList.remove(activeButtonClassName);
};

const filterRandomPictures = () => {
  const shuffled = [...originalPictures];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, COUNT_RANDOM_PICTURES);
};

const onFilterButtonClick = (evt) => {
  if (evt.target.classList.contains(activeButtonClassName)) {
    return;
  }

  deactivateActiveFilter();
  evt.target.classList.add(activeButtonClassName);
  let pictures = [];

  switch (evt.target.id) {
    case filterRandomId:
      pictures = filterRandomPictures();
      break;
    case filterDiscussedId:
      pictures = originalPictures.sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      pictures = originalPictures;
      break;
  }
  clearPictures();
  createPictures(pictures);
};

const debouncedOnFilterButtonClick = debounce(onFilterButtonClick);

const openFilterForm = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  buttonfilter.addEventListener('click', debouncedOnFilterButtonClick);
  buttonFilterRandom.addEventListener('click', debouncedOnFilterButtonClick);
  buttonFilterDiscussed.addEventListener('click', debouncedOnFilterButtonClick);
};

export { openFilterForm };
