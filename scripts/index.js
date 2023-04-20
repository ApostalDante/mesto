import Card from './Card.js';
import { initialCards } from './cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const buttonEditProfile = document.querySelector('.profile__edit-btm');
const buttonAddCard = document.querySelector('.profile__add-btm');
const popupUserSelector = document.querySelector('.popup_type_user');
const popupCardSelector = document.querySelector('.popup_type_card');
const popupImagesSelector = document.querySelector('.popup_type_img');
const formElementUser = document.querySelector('.form_type_user');
const formElementCard = document.querySelector('.form_type_card');
const userNameForm = document.querySelector('.form__input_type_user-name');
const userMyselForm = document.querySelector('.form__input_type_user-myself');
const cardNameInput = document.querySelector('.form__input_type_card-name');
const cardUrlInput = document.querySelector('.form__input_type_card-url');
const elementContainer = document.querySelector('.elements');
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
const formValidatorCard = new FormValidator(options, formElementCard);
const formValidatorUser = new FormValidator(options, formElementUser);
const userForm = new UserInfo(userNameForm, userMyselForm);
const popupUser = new Popup(popupUserSelector);
const popupCard = new Popup(popupCardSelector);
const popupImage = new PopupWithImage(popupImagesSelector);
const pushElementContainer = new Section({
  items: initialCards,
  renderer: (cards) => {
    const card = new Card(cards, '#card', handleCardClick);
    pushElementContainer.addItem(card.createCard());
  }
}, elementContainer);

const setUserFormProfile = new PopupWithForm(popupUserSelector, {
  callbackSubmitForm: () => {
    userForm.setUserInfo();
    popupUser.close();
  }
});
const setCardFormProfile = new PopupWithForm(popupCardSelector, {
  callbackSubmitForm: () => {
    const card = new Card({ name: cardNameInput.value, link: cardUrlInput.value }, '#card', handleCardClick);
    pushElementContainer.addItem(card.createCard());
    popupCard.close();
  }
});

function cleanCardFormValue() {
  formElementCard.reset();
};

function openPopupUser() {
  popupUser.open();
  popupUser.setEventListeners();
  userForm.getUserInfo();
  formValidatorUser.resetValidation();
};

function openPopupCard() {
  popupCard.open();
  popupCard.setEventListeners();
  cleanCardFormValue();
  formValidatorCard.resetValidation();
};

function handleCardClick(link, title) {
  popupImage.open(link, title);
  popupImage.setEventListeners();
};

formValidatorCard.enableValidation();
formValidatorUser.enableValidation();
setUserFormProfile.setEventListeners();
setCardFormProfile.setEventListeners();
pushElementContainer.renderItems();
buttonEditProfile.addEventListener('click', () => openPopupUser());
buttonAddCard.addEventListener('click', () => openPopupCard());







