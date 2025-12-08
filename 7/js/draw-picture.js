import { getItemsPhotos } from './data.js';

const pictureListElement = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictures = getItemsPhotos();

const pictureListFragment = document.createDocumentFragment();

const createPicture = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.appendChild(pictureElement);
};

pictures.forEach(createPicture);

pictureListElement.appendChild(pictureListFragment);

export {
  pictures,
};
