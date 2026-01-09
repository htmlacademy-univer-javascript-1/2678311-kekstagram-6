import { DEFAULT_SCALE, SCALE_STEP, MIN_SCALE, MAX_SCALE } from './consts.js';

const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = DEFAULT_SCALE;

const updateScale = (value) => {
  currentScale = value;
  scaleControlValue.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const newValue = Math.max(MIN_SCALE, currentScale - SCALE_STEP);
  updateScale(newValue);
};

const onBiggerButtonClick = () => {
  const newValue = Math.min(MAX_SCALE, currentScale + SCALE_STEP);
  updateScale(newValue);
};
updateScale(100);

export { onSmallerButtonClick, onBiggerButtonClick, updateScale, previewImage };
