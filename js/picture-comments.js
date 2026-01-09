import { bigPicture, currentPicture } from './draw-big-picture.js';
import { MAX_COMMENTS_UPLOAD } from './consts.js';

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
  bigPictureCommentsCount.innerHTML = `<span class="social__comment-shown-count">${currentCommentCount}</span>  из <span class="comments-count social__comment-total-count">${totalCommentCount}</span> комментариев`;
};

const setTotalCommentCount = (count) => {
  totalCommentCount = count;
  bigPictureCommentsLoader.classList.remove('hidden');
  if (totalCommentCount < MAX_COMMENTS_UPLOAD) {
    setCurrentCommentCount(totalCommentCount);
  }
  else {
    setCurrentCommentCount(MAX_COMMENTS_UPLOAD);
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
  setCurrentCommentCount(currentCommentCount + MAX_COMMENTS_UPLOAD);
  addPartOfComments();
};

export {
  clearComments,
  setTotalCommentCount,
  addPartOfComments,
  bigPictureCommentsLoader,
  onLoaderClick
};
