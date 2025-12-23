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

export { showInteractiveError };
