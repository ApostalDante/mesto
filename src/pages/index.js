import '../pages/index.css';
import Card from '/src/components/Card.js'
import FormValidator from '/src/components/FormValidator.js';
import Section from '/src/components/Section.js';
import PopupWithImage from '/src/components/PopupWithImage.js';
import PopupWithForm from '/src/components/PopupWithForm.js';
import UserInfo from '/src/components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfilmDelete from '../components/PopupConfirmDelete.js';


const buttonEditProfile = document.querySelector('.profile__edit-btm');
const buttonAddCard = document.querySelector('.profile__add-btm');
const buttonChangeAvatar = document.querySelector('.profile__change-avatar-btm');
const popupUserSelector = document.querySelector('.popup_type_user');
const popupCardSelector = document.querySelector('.popup_type_card');
const popupImagesSelector = document.querySelector('.popup_type_img');
const popupAvatarSelector = document.querySelector('.popup_type_avatar');
const popupConfirmSelector = document.querySelector('.popup_type_confirm-delete');
const formElementUser = document.querySelector('.form_type_user');
const formElementCard = document.querySelector('.form_type_card');
const formElementAvatar = document.querySelector('.form_type_avatar');
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
let userId;

const formValidatorCard = new FormValidator(options, formElementCard);
const formValidatorUser = new FormValidator(options, formElementUser);
const formValidatorAvatar = new FormValidator(options, formElementAvatar);
const userForm = new UserInfo({
  userNameProfile: 'profile__user-name',
  userMyselProfile: 'profile__user-myself',
  userAvatarProfile: 'profile__avatar-img',
});

const popupImage = new PopupWithImage(popupImagesSelector);
const pushElementContainer = new Section({
  renderer: (cardObject) => {
    pushElementContainer.addItem(createNewCard(cardObject));
  }
}, elementContainer);

const setUserFormProfile = new PopupWithForm(popupUserSelector, {
  callbackSubmitForm: (dataUser) => {
    setUserFormProfile.showProcessSaving(); api.sendProfileDataToServer(dataUser)
      .then((res) => {
        userForm.setUserInfo({ userName: res.name, userMysel: res.about });
        setUserFormProfile.close();
      })
      .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
      .finally(() => {
        setUserFormProfile.offShowProcessSaving();
      })
  }
});

const setCardFormProfile = new PopupWithForm(popupCardSelector, {
  callbackSubmitForm: (dataCard) => {
    setCardFormProfile.showProcessSaving(); api.addNewCardToServer({ name: dataCard['card-name'], link: dataCard['card-url'] })
      .then((card) => {
        pushElementContainer.addItem(createNewCard(card));
        setCardFormProfile.close();
      })
      .catch((err) => { console.log(`При добавлении новой карточки возникла ошибка, ${err}`) })
      .finally(() => {
        setCardFormProfile.offShowProcessSaving();
      })
  }
});

const setAvatarFormProfile = new PopupWithForm(popupAvatarSelector, {
  callbackSubmitForm: (dataAvatar) => {
    setAvatarFormProfile.showProcessSaving(); api.sendAvatarDataToServer(dataAvatar)
      .then((res) => {
        userForm.setUserAvatar(res.avatar);
        setAvatarFormProfile.close();
      })
      .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
      .finally(() => {
        setAvatarFormProfile.offShowProcessSaving();
      })
  }
});

const createNewCard = function (cardObject) {
  const card = new Card(cardObject, '#card', userId, { cardId: cardObject._id, authorId: cardObject.owner._id, }, {
    handleCardClick: (link, title) => { popupImage.open(link, title) },
    handleCardConfirmDelete: (cardObject, cardId) => { popupConfilmDelete.open(cardObject, cardId) },
    handleCardAddLike: (cardId) => {
      api.sendLikeCardToServer(cardId)
        .then((res) => {
          card.renderLikeInCard(res);
        })
        .catch((err) => { console.log(`При лайке карточки возникла ошибка, ${err}`) })
    },
    handleCardDeleteLike: (cardId) => {
      api.deleteLikeCardToServer(cardId)
        .then((res) => {
          card.renderLikeInCard(res);
        })
        .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  return card.createCard();
};

const popupConfilmDelete = new PopupConfilmDelete(popupConfirmSelector, {
  callbackSubmitForm: (cardObject, cardId) => {
    api.deleteCardInServer(cardId)
      .then(() => {
        cardObject.deleteCard();
        popupConfilmDelete.close();
      })
      .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});

const apiData = {
  link: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '3b08e0b6-8adb-49dc-9f21-be9371b35bfc',
    'Content-Type': 'application/json'
  }
};

const api = new Api(apiData);

function openPopupUser() {
  const userFormValue = userForm.getUserInfo();
  setUserFormProfile.open();
  userNameForm.value = userFormValue.userName;
  userMyselForm.value = userFormValue.userMysel;
  formValidatorUser.resetValidation();
};

function openPopupCard() {
  setCardFormProfile.open();
  formValidatorCard.resetValidation();
};

function openPopupAvatar() {
  setAvatarFormProfile.open();
  formValidatorAvatar.resetValidation();
};

Promise.all([api.getProfileDataInServer(), api.getCardsServer()]).then(([dataUser, cardObject]) => {
  userId = dataUser._id;
  userForm.setUserInfo({ userName: dataUser.name, userMysel: dataUser.about });
  pushElementContainer.renderItems(cardObject.reverse());
  userForm.setUserAvatar(dataUser.avatar);
})
  .catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) });


formValidatorCard.enableValidation();
formValidatorUser.enableValidation();
formValidatorAvatar.enableValidation();
popupImage.setEventListeners();
setUserFormProfile.setEventListeners();
setCardFormProfile.setEventListeners();
setAvatarFormProfile.setEventListeners();
popupConfilmDelete.setEventListeners();
buttonEditProfile.addEventListener('click', () => openPopupUser());
buttonAddCard.addEventListener('click', () => openPopupCard());
buttonChangeAvatar.addEventListener('click', () => openPopupAvatar());