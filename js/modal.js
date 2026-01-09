const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
let isModalOpened = false;

function createModal(template, className, onButtonClick) {
  const modalElement = template.cloneNode(true);
  modalElement.style.zIndex = 1500;
  document.body.appendChild(modalElement);

  isModalOpened = true;
  const button = modalElement.querySelector(`.${className}__button`);
  if (button) {
    button.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('click', onOverlayClick);

  function closeModal() {
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOverlayClick);
    if (button) {
      button.removeEventListener('click', closeModal);
    }
    modalElement.remove();
    if (typeof onButtonClick === 'function') {
      onButtonClick();
    }
    isModalOpened = false;
  }

  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeModal();
    }
  }

  function onOverlayClick(evt) {
    if (evt.target === modalElement) {
      evt.stopPropagation();
      closeModal();
    }
  }
}

const showInteractiveError = () => createModal(errorTemplate, 'error');
const showSuccess = () => createModal(successTemplate, 'success');

export { isModalOpened, showInteractiveError, showSuccess };
