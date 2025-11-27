const names = [
  'Мария',
  'Артём',
  'Кира',
  'Екатерина',
  'Александр',
  'Николай',
  'Сергей',
  'Владислав',
  'Оксана',
  'Ольга',
  'Анна',
];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!',
];

const descriptions = [
  'Горный пейзаж',
  'Закат',
  'Море',
  'Старинный город',
  'Машина',
  'Пляж',
  'Зимний лес',
];


const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getMessage = function (count) {
  let message = '';
  for (let i = 0; i < count; i++) {
    message += `${messages[getRandomInteger(1, messages.length)]} `;
  }

  return message.trim();
};

const maxCommentsCount = 30;

const getComment = function (id) {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInteger(1, 7)}.svg`,
    message: getMessage(getRandomInteger(1, 3)),
    name: names[getRandomInteger(1, names.length)],
  };
};

const getComments = function (itemId, count) {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    const id = (itemId - 1) * maxCommentsCount + i;
    comments.push(getComment(id));
  }
  return comments;
};

const getItem = function (id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: descriptions[getRandomInteger(0, descriptions.length)],
    likes: getRandomInteger(15, 201),
    comments: getComments(id, getRandomInteger(0, maxCommentsCount + 1)),
  };
};

const getItems = function () {
  const items = [];
  for (let i = 1; i <= 25; i++) {
    items.push(getItem(i));
  }
  return items;
};


