import { MAX_LENGTH_DESCRIPTION, MAX_COUNT_HASHTAG } from './consts.js';

const uploadForm = document.querySelector('.img-upload__form');
const hashtagInput = uploadForm.querySelector('[name ="hashtags"]');
const descriptionInput = uploadForm.querySelector('[name ="description"]');
const hashtagRegexp = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field-wrapper--invalid',
  successClass: 'field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

function getTagsFromString(value) {
  return value.toLowerCase().trim().split(/\s+/).map((tag) => tag.trim());
}

function validateHashtagCount(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = getTagsFromString(value);

  return tags.length <= MAX_COUNT_HASHTAG;
}

function validateHashtagsUnique(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = getTagsFromString(value);
  const existTags = new Set();

  for (const tag of tags) {
    if (existTags.has(tag)) {
      return false;
    }
    existTags.add(tag);
  }
  return true;
}

function validateHashtags(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = getTagsFromString(value);

  for (const tag of tags) {
    if (!hashtagRegexp.test(tag)) {
      return false;
    }
  }
  return true;
}


pristine.addValidator(hashtagInput, validateHashtagCount, `Хэштегов не может быть больше ${MAX_COUNT_HASHTAG}!`, 3);
pristine.addValidator(hashtagInput, validateHashtags, 'Хэштеги невалидны!', 2);
pristine.addValidator(hashtagInput, validateHashtagsUnique, 'Хэштеги должны быть уникальны!', 1);

const validateDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

pristine.addValidator(descriptionInput, validateDescription, `Длина комментария не может составлять больше ${MAX_LENGTH_DESCRIPTION} символов!`);

export { hashtagInput, descriptionInput, uploadForm, pristine };
