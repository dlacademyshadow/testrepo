const userNameField = document.querySelector('.j-profile-name');
const userSurnameField = document.querySelector('.j-profile-surname');
const userEmailField = document.querySelector('.j-profile-email');
const userLocationField = document.querySelector('.j-profile-location');
const userAgeField = document.querySelector('.j-profile-age');
const editForm = document.forms.editingForm;
const modalEdit = document.querySelector('.j-modal-editing');
const editingBtn = document.querySelector('.j-editing-button');
const closeEditingBtn = document.querySelector('.j-close-modal-editing');

function getUserData() {
  sendRequest({
    url: `api/users/${localStorage.getItem('userId')}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Что-то пошло не так!')
    }
  }).then((user) => {
    userNameField.innerText = user.data.name;
    userSurnameField.innerText = user.data.surname;
    userEmailField.innerText = user.data.email;
    userLocationField.innerText = user.data.location;
    userAgeField.innerText = user.data.age;
  })
}

function editData(e) {
  e.preventDefault();
  const editData = formFieldProcess({ form: editForm });
  sendRequest({
    url: 'api/users',
    method: 'PUT',
    body: JSON.stringify(editData),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token')
    }
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Что-то пошло не так!')
    }
  }).then((editedUser) => {
    toggleModal(modalEdit)
    getUserData()
  })
}

getUserData()

editForm.addEventListener('submit', (e) => {
  editData(e);
})

editingBtn.addEventListener('click', (e) => {
  toggleModal(modalEdit)
})

closeEditingBtn.addEventListener('click', (e) => {
  toggleModal(modalEdit)
})