import { uploadForm, pristine } from './validate.js';

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

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadInput.value = '';

  if (uploadForm) {
    uploadForm.reset();
  }

  uploadForm.removeEventListener('submit', onSubmit);
  document.removeEventListener('keydown', closeByEscape);
};

uploadInput.addEventListener('change', () => {
  openUploadForm();
});

function closeByEscape(evt) {
  if (evt.key === 'Escape' && evt.target.tagName !== 'INPUT') {
    evt.preventDefault();
    closeUploadForm();
  }

}

function closeByButton() {
  closeUploadForm();
}

function onSubmit(evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return false;
  }
}

