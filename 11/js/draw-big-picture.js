import { clearComments, setTotalCommentCount, addPartOfComments, bigPictureCommentsLoader, onLoaderClick } from './picture-comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
let currentPicture = null;

clearComments();

const onPictureClick = (picture) => {
  currentPicture = picture;
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.name;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  setTotalCommentCount(picture.comments.length);

  addPartOfComments();
  bigPicture.classList.remove('hidden');

  bigPictureCommentsLoader.addEventListener('click', onLoaderClick);

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', closeByEscape);
  bigPictureClose.addEventListener('click', closeByButton);
};

const closeBigPicture = () => {
  currentPicture = null;
  bigPicture.classList.add('hidden');
  clearComments();
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', closeByEscape);
  bigPictureClose.removeEventListener('click', closeByButton);
  bigPictureClose.removeEventListener('click', onLoaderClick);
};

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

function closeByButton() {
  closeBigPicture();
}

export { onPictureClick, bigPicture, currentPicture };
