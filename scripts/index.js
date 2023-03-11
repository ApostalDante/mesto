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
}

function openPopupCard(popup) {
  openPopup(popup);
  cleanCardFormValue();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', doSomething);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', doSomething);
}

function setUserFormProfile(evt) {
  evt.preventDefault();
  userNameProfile.textContent = userNameForm.value;
  userMyselProfile.textContent = userMyselForm.value;
  closePopup(popupUser);
  evt.target.reset();
}

function setCardFormProfile(evt) {
  evt.preventDefault();
  pushElementContainer(addCard(cardNameInput.value, cardUrlInput.value));
  cleanFormValue(cardNameInput);
  cleanFormValue(cardUrlInput);
  closePopup(popupCard);
  evt.target.reset();
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
  trashButton.addEventListener('click', handleDeleteButtonClick);
  imageClick.addEventListener('click', () => openPopupImg(cardName, cardUrl));
  return cardElement;
}

function pushElementContainer(element) {
  elementContainer.prepend(element);
}

function handleDeleteButtonClick(evt) {
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

function doSomething(esc) {
  if (esc.key === 'Escape') {
    const popupOpen = document.querySelector('.popup_opened');
    closePopup(popupOpen);
  }
};


initialCards.forEach(obg => pushElementContainer(addCard(obg.name, obg.link)));
buttonEditProfile.addEventListener('click', () => openPopupUser(popupUser));
buttonAddCard.addEventListener('click', () => openPopupCard(popupCard));
formElementUser.addEventListener('submit', setUserFormProfile);
formElementCard.addEventListener('submit', setCardFormProfile);
buttonAllClosePopup.forEach(btn => btn.addEventListener('click', (evt) => {
  closePopup(evt.target.closest('.popup_opened'));
  closetInputError(options);
}));
popup.forEach(btn => btn.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup_opened'));
    closetInputError(options);
  }
}));



