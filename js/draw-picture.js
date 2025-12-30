import { onPictureClick } from './draw-big-picture.js';
import { showAlert } from './alert.js';
import { getData, errorGetText } from './api.js';
import { openFilterForm } from './filters.js';

const pictureListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const createPicture = (picture) => {

  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', () => onPictureClick(picture));

  fragment.appendChild(pictureElement);
};

const createPictures = (pictures) => {
  pictures.forEach(createPicture);
  pictureListElement.appendChild(fragment);
};

let originalPictures = [];

const clearPictures = () => {
  pictureListElement.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};


getData()
  .then((data) => {
    originalPictures = data;
    createPictures(originalPictures);
    openFilterForm();
  })
  .catch(
    () => {
      showAlert(errorGetText);
    }
  );

export { createPictures, originalPictures, clearPictures };
