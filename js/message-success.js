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


export { showSuccess };
