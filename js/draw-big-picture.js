import './draw-picture.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const createComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentElementPicture = commentElement.querySelector('.social__picture');
  commentElementPicture.src = avatar;
  commentElementPicture.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  commentListFragment.appendChild(commentElement);
};

const clearComments = () => {
  commentListElement.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};

const onPictureClick = (picture) => {
  bigPictureCommentsLoader.classList.add('hidden');
  bigPictureCommentsCount.classList.add('hidden');

  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.big-picture__img img').alt = picture.name;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

  picture.comments.forEach(createComment);
  commentListElement.appendChild(commentListFragment);
  bigPicture.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', closeByEscape);
  bigPictureClose.addEventListener('click', closeByButton);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  clearComments();
  document.querySelector('body').classList.remove('modal-open');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureCommentsCount.classList.remove('hidden');

  document.removeEventListener('keydown', closeByEscape);
  bigPictureClose.removeEventListener('click', closeByButton);
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

export { onPictureClick };
