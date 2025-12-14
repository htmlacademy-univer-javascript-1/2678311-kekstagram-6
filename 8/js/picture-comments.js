import { bigPicture, currentPicture } from './draw-big-picture.js';

const bigPictureCommentsLoader = document.querySelector('.comments-loader');
const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const commentTemplate = document.querySelector('.social__comment');
const commentListElement = document.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();
let currentCommentCount = 0;
let totalCommentCount = 0;

const setCurrentCommentCount = (count) => {
  currentCommentCount = count;
  if (currentCommentCount >= totalCommentCount) {
    currentCommentCount = totalCommentCount;
    bigPictureCommentsLoader.classList.add('hidden');
  }
  bigPictureCommentsCount.innerHTML = `${currentCommentCount} из <span class="comments-count">${totalCommentCount}</span> комментариев`;
};

const setTotalCommentCount = (count) => {
  totalCommentCount = count;
  bigPictureCommentsLoader.classList.remove('hidden');
  if (totalCommentCount < 5) {
    setCurrentCommentCount(totalCommentCount);
  }
  else {
    setCurrentCommentCount(5);
  }
  if (totalCommentCount === 0) {
    bigPictureCommentsCount.innerHTML = `<span class="comments-count">${totalCommentCount}</span> комментариев`;
  }

  bigPicture.querySelector('.comments-count').textContent = totalCommentCount;
};

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
  totalCommentCount = 0;
  currentCommentCount = 0;
};

const addPartOfComments = () => {
  const factCommentCount = commentListElement.querySelectorAll('.social__comment').length;

  for (let i = factCommentCount; i < currentCommentCount; i++) {
    createComment(currentPicture.comments[i]);
  }
  commentListElement.appendChild(commentListFragment);
};

const onLoaderClick = () => {
  setCurrentCommentCount(currentCommentCount + 5);
  addPartOfComments();
};

export {
  clearComments,
  setTotalCommentCount,
  addPartOfComments,
  bigPictureCommentsLoader,
  onLoaderClick
};
