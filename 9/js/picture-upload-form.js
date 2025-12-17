import { uploadForm, pristine, hashtagInput, descriptionInput } from './validate.js';

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

const clearError = () => {
  uploadForm.querySelectorAll('.form__error').forEach((element) => {
    element.remove();
  });
};


const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadForm.removeEventListener('submit', onSubmit);
  document.removeEventListener('keydown', closeByEscape);
  clearError();
};


uploadInput.addEventListener('change', () => {
  openUploadForm();
});

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const activeElement = document.activeElement.name;
    if (activeElement !== 'hashtags' && activeElement !== 'description') {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}

function closeByButton() {
  closeUploadForm();
}

function onSubmit(evt) {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
    document.querySelectorAll('.form__error').forEach((element) => {
      element.style.display = 'block';
      element.style.marginBottom = '20px';
    });

    return false;
  }
}

