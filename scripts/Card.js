import { openPopup } from './index.js';

class Card {
  constructor(cardObg, cardTemplate) {
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._cardName = cardObg.name;
    this._cardUrl = cardObg.link;
  };

  _createCard() {
    const cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    const trashButton = cardElement.querySelector('.element__trash');
    const likeButton = cardElement.querySelector('.element__like');
    const imageClick = cardElement.querySelector('.element__img');
    cardElement.querySelector('.element__text').textContent = this._cardName;
    imageClick.src = this._cardUrl;
    imageClick.alt = this._cardName;
    likeButton.addEventListener('click', this._likeActive);
    trashButton.addEventListener('click', this._handleDeleteButtonClick);
    imageClick.addEventListener('click', () => this._openPopupImg());
    return cardElement;
  };

  _handleDeleteButtonClick(evt) {
    evt.target.closest('.element').remove();
  };

  _likeActive(evt) {
    evt.target.classList.toggle('element__like_type_active');
  };

  _openPopupImg() {
    const imgInPopup = document.querySelector('.popup__image');
    const titleInPopup = document.querySelector('.popup__title');
    const popupImg = document.querySelector('.popup_type_img');
    imgInPopup.src = this._cardUrl;
    imgInPopup.alt = this._cardName;
    titleInPopup.textContent = this._cardName;
    openPopup(popupImg);
  };

  pushElementContainer() {
    this.elementContainer = document.querySelector('.elements');
    this.elementContainer.prepend(this._createCard());
  };
};

export default Card;



