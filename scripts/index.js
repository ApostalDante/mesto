const page = document.querySelector('.page');
const editProfiletButton = document.querySelector('.profile__edit-btm');
const addCardButton = document.querySelector('.profile__add-btm');
const popup = document.querySelectorAll('.popup');
const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const formElementUser = document.querySelector('.form_type_user');
const formElementCard = document.querySelector('.form_type_card');
const closePopupButtonAll = page.querySelectorAll('.popup__close');
const userNameForm = document.querySelector('.form__input_type_user-name');
const userMyselForm = document.querySelector('.form__input_type_user-myself');
const userNameProfile = document.querySelector('.profile__user-name');
const userMyselProfile = document.querySelector('.profile__user-myself');
const cardNameInput = document.querySelector('.form__input_type_card-name');
const cardUrlInput = document.querySelector('.form__input_type_card-url');
const cardElements = document.querySelector('.cards');
const elementContainer = cardElements.querySelector('.elements');
const popupImg = document.querySelector('.popup_type_img');
const imgInPopup = document.querySelector('.popup__image');
const titleInPopup = document.querySelector('.popup__title');

function setUserFormValue() {
  userNameForm.value = userNameProfile.textContent;
  userMyselForm.value = userMyselProfile.textContent;
}

function cleanCardFormValue() {
  cardNameInput.value = '';
  cardUrlInput.value = '';
}

function openPopupUser(popup) {
  openPopup(popup);
  setUserFormValue();
  enableValidation(options);
}

function openPopupCard(popup) {
  openPopup(popup);
  cleanCardFormValue();
  enableValidation(options);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function setUserFormProfile(evt) {
  evt.preventDefault();
  userNameProfile.textContent = userNameForm.value;
  userMyselProfile.textContent = userMyselForm.value;
  closePopup(popupUser);
}

function setCardFormProfile(evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardUrlInput.value);
  cleanFormValue(cardNameInput);
  cleanFormValue(cardUrlInput);
  closePopup(popupCard);
}

function addCard(cardName, cardUrl) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const trashButton = cardElement.querySelector('.element__trash');
  const likeButton = cardElement.querySelector('.element__like');
  const imageClick = cardElement.querySelector('.element__img');
  cardElement.querySelector('.element__text').textContent = cardName;
  imageClick.src = cardUrl;
  imageClick.alt = cardName;
  likeButton.addEventListener('click', likeActive);
  trashButton.addEventListener('click', deleteCart);
  imageClick.addEventListener('click', () => openPopupImg(cardName, cardUrl));
  pushElementContainer(cardElement);
}

function pushElementContainer(element) {
  elementContainer.prepend(element);
}

function deleteCart(evt) {
  evt.target.closest('.element').remove();
}

function likeActive(evt) {
  evt.target.classList.toggle('element__like_type_active');
}

function cleanFormValue(input) {
  return input.value = '';
}

function openPopupImg(title, src) {
  imgInPopup.src = src;
  imgInPopup.alt = title;
  titleInPopup.textContent = title;
  openPopup(popupImg);
}

function closeInputError() {
  const errorInput = document.querySelector('.form__input_type_error');
  const erorrSpan = document.querySelector('.form__input-error_active');
  errorInput.classList.remove('form__input_type_error');
  erorrSpan.classList.remove('form__input-error_active');
}

const options = {
  formSelector: '.form',
  formSetSelector: '.form__set',
  formInputSelector: '.form__input',
  formSaveSelector: '.form__save',
  formInputTypeClass: 'form__input_type_error',
  formInputErrorClass: 'form__input-error_active',
  buttonInactiveClass: 'form__save_disablet',
}


initialCards.forEach(obg => addCard(obg.name, obg.link));
editProfiletButton.addEventListener('click', () => openPopupUser(popupUser));
addCardButton.addEventListener('click', () => openPopupCard(popupCard));
formElementUser.addEventListener('submit', setUserFormProfile);
formElementCard.addEventListener('submit', setCardFormProfile);
closePopupButtonAll.forEach(btn => btn.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup_opened'));
  closeInputError();
}));
popup.forEach(btn => btn.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup_opened'));
    closeInputError();
  }
}));
document.addEventListener('keydown', function (esc) {
  if (esc.key === 'Escape') {
    popup.forEach(el => {
      if (el.closest('.popup_opened')) {
        closePopup(el);
        closeInputError();
      }
    })
  }
});
