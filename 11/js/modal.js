//error
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showInteractiveError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.style.zIndex = 1500;

  document.body.appendChild(errorElement);
  document.addEventListener('keydown', onEscPressError);
  document.addEventListener('click', onOverlayClick);
  errorElement.querySelector('.error__button').addEventListener('click', onButtonClickError);
};

function onButtonClickError() {
  closeInteractiveError();
}

function onEscPressError(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeInteractiveError();
  }
}

function onOverlayClick(evt) {
  if (evt.target === document.querySelector('.error')) {
    closeInteractiveError();
  }
}

function closeInteractiveError() {
  document.removeEventListener('keydown', onEscPressError);
  document.removeEventListener('click', onOverlayClick);
  document.querySelector('.error').remove();
}

// success

const successTemplate = document.querySelector('#success').content.querySelector('.success');

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);

  document.body.appendChild(successElement);
  document.addEventListener('keydown', onEscPressSuccess);
  document.addEventListener('click', onOverlayClickSuccess);
  successElement.querySelector('.success__button').addEventListener('click', onButtonClickSuccess);
};

function closeSuccess() {
  document.removeEventListener('keydown', onEscPressSuccess);
  document.removeEventListener('click', onOverlayClickSuccess);
  document.querySelector('.success').remove();
}

function onButtonClickSuccess() {
  closeSuccess();
}

function onEscPressSuccess(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccess();
  }
}

function onOverlayClickSuccess(evt) {
  if (evt.target === document.querySelector('.success')) {
    closeSuccess();
  }
}

export { showInteractiveError, showSuccess };
