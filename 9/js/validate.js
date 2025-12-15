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

function validateHashtagCount(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = value.trim().split(/\s+/).map((tag) => tag.trim());

  return tags.length <= 5;
}

function validateHashtagsUnique(value) {
  if (!value.trim()) {
    return true;
  }

  const tags = value.toLowerCase().trim().split(/\s+/).map((tag) => tag.trim());
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

  const tags = value.trim().split(/\s+/).map((tag) => tag.trim());

  for (const tag of tags) {
    if (!hashtagRegexp.test(tag)) {
      return false;
    }
  }
  return true;
}


pristine.addValidator(hashtagInput, validateHashtagCount, 'Хэштегов не может быть больше 5!');
pristine.addValidator(hashtagInput, validateHashtagsUnique, 'Хэштеги должны быть уникальны!');
pristine.addValidator(hashtagInput, validateHashtags, 'Хэштеги невалидны!');

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(descriptionInput, validateDescription, 'Длина комментария не может составлять больше 140 символов!');

export { hashtagInput, descriptionInput, uploadForm, pristine };
