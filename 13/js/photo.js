import { FILE_TYPES } from './consts.js';

const uploadInput = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const setFormPhoto = () => {
  const file = uploadInput.files[0];

  if (!file) {
    return false;
  }

  const isValidType = FILE_TYPES.includes(file.type);

  if (isValidType) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectPreviews.forEach((el) => {
      el.style.backgroundImage = `url(${url})`;
    });
    return true;
  }
  else {
    alert('Пожалуйста, выберите изображение в формате JPG, JPEG, PNG.');
    preview.src = '';
    effectPreviews.forEach((el) => {
      el.style.backgroundImage = '';
    });
    return false;
  }
};

export { setFormPhoto, uploadInput };

