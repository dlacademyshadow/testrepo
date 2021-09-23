function updateToken() {
  const token = localStorage.getItem('token');
  if (token) {
    document.querySelector('.j-to-profile').classList.toggle('hidden');
  }
}

// Функция обработки полей формы
function formFieldProcess({ form, type = 'json' }) {
  switch (type) {
    case 'json':
      const formInputs = form.querySelectorAll('input');
      const body = {};
      for (let input of formInputs) {
        body[input.name] = input.value
      }
      return body;
      break;
    case 'formData':
      return new FormData(form);
      break;
    default:
      return 'Вы передали глупость.';
  }
}

const BACKED_URL = 'https://academy.directlinedev.com'

// Функция обработки запросов на сервер
function sendRequest({ url, method, body, headers }) {
  const options = {
    method,
    body,
    headers,
  }

  return fetch(`${BACKED_URL}/${url}`, options);
}

// Тоггл модалки
function toggleModal(modal) {
  modal.classList.toggle('hidden')
}