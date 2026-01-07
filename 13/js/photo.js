import { FILE_TYPES } from './consts.js';

const uploadInput = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const setFormPhoto = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    preview.src = url;
    effectPreviews.forEach((el) => {
      el.style.backgroundImage = `url(${url})`;
    });
  }
};

export { setFormPhoto, uploadInput };

