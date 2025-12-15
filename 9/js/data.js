import { getRandomInteger } from './util.js';
import * as consts from './consts.js';

const getMessage = function (count) {
  let message = '';
  for (let i = 0; i < count; i++) {
    message += `${consts.MESSAGES[getRandomInteger(0, consts.MESSAGES.length - 1)]} `;
  }

  return message.trim();
};

let commentIdCounter = 1;

const getComments = () => {
  const commentCount = getRandomInteger(0, consts.MAX_COMMENTS_COUNT);
  const commentArray = [];

  for (let i = 0; i < commentCount; i++) {
    commentArray.push({
      id: commentIdCounter++,
      avatar: `img/avatar-${getRandomInteger(1, consts.MAX_NAMBER_AVATAR)}.svg`,
      message: getMessage(getRandomInteger(1, consts.MAX_MESSAGE_COUNT)),
      name: consts.NAMES[getRandomInteger(1, consts.NAMES.length)],
    });
  }
  return commentArray;
};

const getItem = function (id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: consts.DESCRIPTIONS[getRandomInteger(0, consts.DESCRIPTIONS.length)],
    likes: getRandomInteger(consts.MIN_LIKE_COUNT, consts.MAX_LIKE_COUNT),
    comments: getComments(id, getRandomInteger(0, consts.MAX_COMMENTS_COUNT)),
  };
};

const getItemsPhotos = function () {
  return Array.from({ length: consts.PHOTOS_COUNT }, (_, k) => getItem(k + 1));
};

export { getItemsPhotos };
