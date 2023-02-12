const editProfiletButton = document.querySelector('.profile__edit-btm');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const closePopupButton = popup.querySelector('.popup__close');
const userNameForm = document.querySelector('.form__input_type_user-name');
const userMyselForm = document.querySelector('.form__input_type_user-myself');
const userNameProfile = document.querySelector('.profile__user-name');
const userMyselProfile = document.querySelector('.profile__user-myself');


editProfiletButton.addEventListener('click', toggleOpenPopup);
closePopupButton.addEventListener('click', closePopupButtonClick);
formElement.addEventListener('submit', setUserFormProfile);

function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
  setFormValue();
}

function closePopupButtonClick() {
  popup.classList.remove('popup_opened');
}

function setFormValue() {
  userNameForm.value = userNameProfile.textContent;
  userMyselForm.value = userMyselProfile.textContent;
}

function setUserFormProfile(evt) {
  evt.preventDefault();
  userNameProfile.textContent = userNameForm.value;
  userMyselProfile.textContent = userMyselForm.value;
  closePopupButtonClick();
}
