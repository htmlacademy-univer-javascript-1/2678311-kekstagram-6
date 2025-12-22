import { getItemsPhotos } from './data.js';
import { onPictureClick } from './draw-big-picture.js';

const pictureListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = getItemsPhotos();

const pictureListFragment = document.createDocumentFragment();

const createPicture = (picture) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__img').alt = picture.description;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  pictureElement.addEventListener('click', () => onPictureClick(picture));

  pictureListFragment.appendChild(pictureElement);
};

pictures.forEach(createPicture);

pictureListElement.appendChild(pictureListFragment);

export {
  pictures,
  createPicture
};
