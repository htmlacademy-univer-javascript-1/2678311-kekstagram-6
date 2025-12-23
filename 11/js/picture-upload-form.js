import { uploadForm, pristine, hashtagInput, descriptionInput } from './validate.js';
import { sendForm } from './api.js';
import { showInteractiveError } from './message-error.js';


const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const pictureFormClose = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  uploadForm.addEventListener('submit', onSubmit);

  document.addEventListener('keydown', closeByEscape);
  pictureFormClose.addEventListener('click', closeByButton);
};

const resetForm = () => {
  uploadForm.querySelectorAll('.form__error').forEach((element) => {
    element.remove();
  });
  uploadForm.reset();
  uploadInput.value = '';
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.removeEventListener('submit', onSubmit);
  document.removeEventListener('keydown', closeByEscape);
  resetForm();
};

uploadInput.addEventListener('change', () => {
  openUploadForm();
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement;

    if (activeElement !== hashtagInput && activeElement !== descriptionInput) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}

function closeByButton() {
  closeUploadForm();
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
  }
  else {
    blockSubmitButton();
    sendForm()
      .catch(
        (err) => {
          showInteractiveError(err.message);
        }
      )
      .finally(() => {
        closeUploadForm();
        unblockSubmitButton();
      });
  }
}

export { closeByButton };

