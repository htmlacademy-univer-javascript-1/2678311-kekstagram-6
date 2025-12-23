import { uploadForm } from './validate.js';
import { showSuccess } from './message-success.js';

const DATA_GET_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';

const errorGetText = 'Не удалось загрузить данные. Попробуйте обновить страницу';

function getData() {
  return fetch(DATA_GET_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorGetText);
      }
      return response.json();
    });
}


const errorPostText = 'Не удалось отправить форму. Попробуйте ещё раз';
const DATA_POST_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

function sendForm() {
  const formData = new FormData(uploadForm);

  return fetch(
    DATA_POST_URL,
    {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      if (response.ok) {
        showSuccess();
      }
      else {
        throw new Error(errorPostText);
      }
    });
}

export { getData, sendForm };
