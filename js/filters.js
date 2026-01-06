import { createPictures, originalPictures, clearPictures } from './draw-picture.js';
import { getRandomInteger } from './util.js';
import { COUNT_RANDOM_PICTURES, TIMEOUT_DELAY } from './consts.js';
import { debounce } from './util.js';

const imgFiltersElement = document.querySelector('.img-filters');
const activeButtonClassName = 'img-filters__button--active';
const filterDefaultId = 'filter-default';
const filterRandomId = 'filter-random';
const filterDiscussedId = 'filter-discussed';
const buttonfilter = imgFiltersElement.querySelector(`#${filterDefaultId}`);
const buttonFilterRandom = imgFiltersElement.querySelector(`#${filterRandomId}`);
const buttonFilterDiscussed = imgFiltersElement.querySelector(`#${filterDiscussedId}`);

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

const recreatePicturesByButtonId = (buttonId) => {
  let pictures = [];
  switch (buttonId) {
    case filterRandomId:
      pictures = filterRandomPictures();
      break;
    case filterDiscussedId:
      pictures = [...originalPictures];
      pictures.sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      pictures = originalPictures;
      break;
  }
  clearPictures();
  createPictures(pictures);
};

const debouncedRecreatePicturesByButtonId = debounce(recreatePicturesByButtonId);

const onFilterButtonClick = (evt) => {
  if (evt.target.classList.contains(activeButtonClassName)) {
    return;
  }

  deactivateActiveFilter();
  evt.target.classList.add(activeButtonClassName);

  debouncedRecreatePicturesByButtonId(evt.target.id);
};


const openFilterForm = () => {
  imgFiltersElement.classList.remove('img-filters--inactive');

  buttonfilter.addEventListener('click', onFilterButtonClick);
  buttonFilterRandom.addEventListener('click', onFilterButtonClick);
  buttonFilterDiscussed.addEventListener('click', onFilterButtonClick);
};

export { openFilterForm };
