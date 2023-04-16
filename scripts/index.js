import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';

const page = document.querySelector('.page');
const buttonEditProfile = document.querySelector('.profile__edit-btm');
const buttonAddCard = document.querySelector('.profile__add-btm');
const popup = document.querySelectorAll('.popup');
const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const formElementUser = document.querySelector('.form_type_user');
const formElementCard = document.querySelector('.form_type_card');
const buttonAllClosePopup = page.querySelectorAll('.popup__close');
const userNameForm = document.querySelector('.form__input_type_user-name');
const userMyselForm = document.querySelector('.form__input_type_user-myself');
const userNameProfile = document.querySelector('.profile__user-name');
const userMyselProfile = document.querySelector('.profile__user-myself');
const cardNameInput = document.querySelector('.form__input_type_card-name');
const cardUrlInput = document.querySelector('.form__input_type_card-url');
const options = {
  formSelector: '.form',
  formSetSelector: '.form__set',
  formInputSelector: '.form__input',
  formSaveSelector: '.form__save',
  formSpanErorClass: '.form__input-error',
  formInputTypeClass: 'form__input_type_error',
  formInputErrorClass: 'form__input-error_active',
  buttonInactiveClass: 'form__save_disablet',
};

function setUserFormValue() {
  userNameForm.value = userNameProfile.textContent;
  userMyselForm.value = userMyselProfile.textContent;
};

function cleanCardFormValue() {
  cardNameInput.value = '';
  cardUrlInput.value = '';
};

function openPopupUser(popup) {
  openPopup(popup);
  setUserFormValue();
  const formValidator = new FormValidator(options, formElementUser);
  formValidator.enableValidation();
};

function openPopupCard(popup) {
  openPopup(popup);
  cleanCardFormValue();
  const formValidator = new FormValidator(options, formElementCard);
  formValidator.enableValidation();
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
};

function setUserFormProfile(evt) {
  evt.preventDefault();
  userNameProfile.textContent = userNameForm.value;
  userMyselProfile.textContent = userMyselForm.value;
  closePopup(popupUser);
  evt.target.reset();
};

function setCardFormProfile(evt) {
  evt.preventDefault();
  const card = new Card({ name: cardNameInput.value, link: cardUrlInput.value }, '#card');
  card.pushElementContainer();
  cleanFormValue(cardNameInput);
  cleanFormValue(cardUrlInput);
  closePopup(popupCard);
  evt.target.reset();
};

function cleanFormValue(input) {
  return input.value = '';
};

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};

initialCards.forEach(obg => {
  obg = new Card(obg, '#card')
  obg.pushElementContainer();
});
buttonEditProfile.addEventListener('click', () => openPopupUser(popupUser));
buttonAddCard.addEventListener('click', () => openPopupCard(popupCard));
formElementUser.addEventListener('submit', setUserFormProfile);
formElementCard.addEventListener('submit', setCardFormProfile);
buttonAllClosePopup.forEach(btn => btn.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup_opened'));
}));
popup.forEach(btn => btn.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup_opened'));
  }
}));

export { openPopup };
