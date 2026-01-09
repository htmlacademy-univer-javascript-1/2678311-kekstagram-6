import { uploadForm } from './validate.js';
import { showSuccess } from './modal.js';

const DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const API_ROUTE = {
  GET: `${DATA_URL}/data`,
  POST: DATA_URL
};

const errorGetText = 'Не удалось загрузить данные. Попробуйте обновить страницу';

function getData() {
  return fetch(API_ROUTE.GET)
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorGetText);
      }
      return response.json();
    });
}


const errorPostText = 'Не удалось отправить форму. Попробуйте ещё раз';

function sendForm() {
  const formData = new FormData(uploadForm);

  return fetch(
    API_ROUTE.POST,
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

export { getData, sendForm, errorGetText, errorPostText };
