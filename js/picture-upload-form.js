import { uploadForm, pristine, hashtagInput, descriptionInput } from './validate.js';
import { sendForm } from './api.js';
import { showInteractiveError, isModalOpened } from './modal.js';
import { setFormPhoto, uploadInput } from './photo.js';
import { onSmallerButtonClick, onBiggerButtonClick, updateScale } from './picture-scale.js';

const uploadOverlay = document.querySelector('.img-upload__overlay');
const pictureFormClose = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadForm.addEventListener('submit', onSubmit);

  document.addEventListener('keydown', closeByEscape);
  pictureFormClose.addEventListener('click', closeByButton);

  scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
  scaleControlBigger.addEventListener('click', onBiggerButtonClick);
};

const resetForm = () => {
  uploadForm.querySelectorAll('.form__error').forEach((element) => {
    element.remove();
  });
  uploadForm.reset();
  uploadInput.value = '';
  updateScale(100);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.removeEventListener('submit', onSubmit);
  document.removeEventListener('keydown', closeByEscape);
  pictureFormClose.removeEventListener('click', closeByButton);

  scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
  scaleControlBigger.removeEventListener('click', onBiggerButtonClick);
};

uploadInput.addEventListener('change', () => {
  const success = setFormPhoto();
  if (success) {
    openUploadForm();
  }
});

function closeByEscape(evt) {
  if (isModalOpened) {
    return;
  }

  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;

    if (activeElement !== hashtagInput && activeElement !== descriptionInput) {
      evt.preventDefault();
      evt.stopPropagation();
      closeUploadForm();
      resetForm();
    }
  }
}

function closeByButton() {
  closeUploadForm();
  resetForm();
}

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const submitButton = uploadForm.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function onSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    document.querySelectorAll('.form__error').forEach((element) => {
      element.classList.add('form-validate-error');
    });
    return;
  }
  blockSubmitButton();
  sendForm()
    .then(() => {
      resetForm();
      closeUploadForm();
    })
    .catch(
      (err) => {
        showInteractiveError(err.message);
      }
    )
    .finally(() => {
      unblockSubmitButton();
    });
}


export { closeByButton };

