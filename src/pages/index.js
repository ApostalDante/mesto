import '../pages/index.css';
import Card from '/src/components/Card.js'
import { initialCards } from '/src/components/utils/cards.js';
import FormValidator from '/src/components/FormValidator.js';
import Section from '/src/components/Section.js';
import Popup from '/src/components/Popup.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import UserInfo from '/src/components/UserInfo.js';

const buttonEditProfile = document.querySelector('.profile__edit-btm');
const buttonAddCard = document.querySelector('.profile__add-btm');
const popupUserSelector = document.querySelector('.popup_type_user');
const popupCardSelector = document.querySelector('.popup_type_card');
const popupImagesSelector = document.querySelector('.popup_type_img');
const formElementUser = document.querySelector('.form_type_user');
const formElementCard = document.querySelector('.form_type_card');
const userNameForm = document.querySelector('.form__input_type_user-name');
const userMyselForm = document.querySelector('.form__input_type_user-myself');
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
const userForm = new UserInfo({
  userNameProfile: 'profile__user-name',
  userMyselProfile: 'profile__user-myself',
});

const popupImage = new PopupWithImage(popupImagesSelector);
const pushElementContainer = new Section({
  items: initialCards,
  renderer: (cards) => {
    const card = new Card(cards, '#card', handleCardClick);
    pushElementContainer.addItem(card.createCard());
  }
}, elementContainer);

const setUserFormProfile = new PopupWithForm(popupUserSelector, {
  callbackSubmitForm: (dataUser) => {
    userForm.setUserInfo({
      userName: dataUser['user-name'], userMysel: dataUser['user-myself'],
    });
    setUserFormProfile.close();
  }
});

const setCardFormProfile = new PopupWithForm(popupCardSelector, {
  callbackSubmitForm: (dataCard) => {
    const card = new Card({ name: dataCard['card-name'], link: dataCard['card-url'] }, '#card', handleCardClick);
    pushElementContainer.addItem(card.createCard());
    setCardFormProfile.close();
  }
});

function cleanCardFormValue() {
  formElementCard.reset();
};

function openPopupUser() {
  setUserFormProfile.open();
  userNameForm.value = userForm.getUserInfo().userName;
  userMyselForm.value = userForm.getUserInfo().userMysel;
  userForm.getUserInfo();
  formValidatorUser.resetValidation();
};

function openPopupCard() {
  setCardFormProfile.open();
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

