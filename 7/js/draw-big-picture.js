import './draw-picture.js';
import { pictures } from './draw-picture.js';

const pictureElements = document.querySelectorAll('.pictures .picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  commentListFragment.appendChild(commentElement);
};

const clearComments = () => {
  commentListElement.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};

clearComments();

pictureElements.forEach((element) => {
  element.addEventListener('click', () => {
    const picture = pictures.find(({ url }) => element.querySelector('.picture__img').src.endsWith(url));

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.big-picture__img img').alt = picture.name;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    picture.comments.forEach(createComment);
    commentListElement.appendChild(commentListFragment);
    bigPicture.classList.remove('hidden');

    document.querySelector('body').classList.add('modal-open');
  });
});

bigPictureCommentsLoader.addEventListener('click', () => {
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureCommentsCount.classList.add('hidden');
});

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  clearComments();
  document.querySelector('body').classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureCommentsCount.classList.remove('hidden');
};

bigPictureClose.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
});

