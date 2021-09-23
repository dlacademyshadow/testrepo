const modalLoginOpeningBtn = document.querySelector('.j-login-button');
const modalLoginContainer = document.querySelector('.j-modal-login');
const modalLoginCloseBtn = document.querySelector('.j-close-modal-login');
const loginForm = document.forms.loginForm;

const modalRegisterOpeningBtn = document.querySelector('.j-register-button');
const modalRegisterContainer = document.querySelector('.j-modal-register');
const modalRegisterCloseBtn = document.querySelector('.j-close-modal-register');
const registerForm = document.forms.registerForm;

// Логика регистрации пользователя
function register(e) {
  e.preventDefault();
  const registrationData = formFieldProcess({ form: registerForm });
  sendRequest({
    url: 'api/users',
    method: 'POST',
    body: JSON.stringify(registrationData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Что-то пошло не так!')
    }
  }).then((createdUser) => {
    alert(`Вы успешно зарегистрировались! Добро пожаловать, ${createdUser.data.name} ${createdUser.data.surname}`);
    toggleModal(modalRegisterContainer)
  }).catch((err) => console.error(err))
}

function logIn(e) {
  e.preventDefault();
  const logInData = formFieldProcess({ form: loginForm });
  sendRequest({
    url: 'api/users/login',
    method: 'POST',
    body: JSON.stringify(logInData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Что-то пошло не так!')
    }
  }).then((loggedInUser) => {
    localStorage.setItem('userId', loggedInUser.data.userId);
    localStorage.setItem('token', loggedInUser.data.token);
    toggleModal(modalLoginContainer);
  })
}

registerForm.addEventListener('submit', (e) => {
  register(e);
})

loginForm.addEventListener('submit', (e) => {
  logIn(e);
})

// ...

modalRegisterOpeningBtn.addEventListener('click', (e) => {
  toggleModal(modalRegisterContainer);
})

modalRegisterCloseBtn.addEventListener('click', (e) => {
  toggleModal(modalRegisterContainer);
})

modalLoginOpeningBtn.addEventListener('click', (e) => {
  toggleModal(modalLoginContainer);
})

modalLoginCloseBtn.addEventListener('click', (e) => {
  toggleModal(modalLoginContainer);
})

updateToken();