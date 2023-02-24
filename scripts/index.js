const page = document.querySelector('.page');
const editProfiletButton = document.querySelector('.profile__edit-btm');
const addCardButton = document.querySelector('.profile__add-btm');
const popupAll = page.querySelectorAll('.popup');
const popupUser = document.querySelector('.popup_type_user');
const popupCard = document.querySelector('.popup_type_card');
const formElementUser = document.querySelector('.form__type_user');
const formElementCard = document.querySelector('.form__type_card');
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

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function setUserFormValue() {
  userNameForm.value = userNameProfile.textContent;
  userMyselForm.value = userMyselProfile.textContent;
}

function toggleOpenPopupUser() {
  popupUser.classList.toggle('popup_opened');
  setUserFormValue();
}

function toggleOpenPopupCard() {
  popupCard.classList.toggle('popup_opened');
}

function closePopupButtonAllClick() {
  popupAll.forEach(pop => pop.classList.remove('popup_opened'))
}


function setUserFormProfile(evt) {
  evt.preventDefault();
  userNameProfile.textContent = userNameForm.value;
  userMyselProfile.textContent = userMyselForm.value;
  closePopupButtonAllClick();
}

function setCardFormProfile(evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardUrlInput.value);
  cleanFormValue(cardNameInput);
  cleanFormValue(cardUrlInput);
  closePopupButtonAllClick();
}

function addCard(cardName, cardUrl) {
  if (cardName == '') cardName = 'Архыз'; //значение по умолчанию, пока нет валидации 
  if (cardUrl == '') cardUrl = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'; //значение по умолчанию, пока нет валидации 
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const trashButton = cardElement.querySelector('.element__trash');
  const likeButton = cardElement.querySelector('.element__like');
  const imageClick = cardElement.querySelector('.element__img');
  cardElement.querySelector('.element__text').textContent = cardName;
  cardElement.querySelector('.element__img').src = cardUrl;
  likeButton.addEventListener('click', likeActive);
  trashButton.addEventListener('click', deleteCart);
  elementContainer.prepend(cardElement);
  imageClick.addEventListener('click', () => openPopupImg(cardElement));
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

function openPopupImg(obg) {
  const imgCard = obg.querySelector('.element__img');
  const titleCard = obg.querySelector('.element__text');
  const imgInPopup = document.querySelector('.popup__image');
  const titleInPopup = document.querySelector('.popup__title');
  imgInPopup.src = imgCard.src;
  titleInPopup.textContent = titleCard.textContent;
  toggleOpenPopupImg();
}

function toggleOpenPopupImg() {
  popupImg.classList.toggle('popup_opened');
}

initialCards.forEach(obg => addCard(obg.name, obg.link));
editProfiletButton.addEventListener('click', toggleOpenPopupUser);
addCardButton.addEventListener('click', toggleOpenPopupCard);
formElementUser.addEventListener('submit', setUserFormProfile);
formElementCard.addEventListener('submit', setCardFormProfile);
closePopupButtonAll.forEach(btn => btn.addEventListener('click', () => closePopupButtonAllClick()));

// плавность 

