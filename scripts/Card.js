class Card {
  constructor(cardObg, cardTemplate, handleCardClick) {
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._cardName = cardObg.name;
    this._cardUrl = cardObg.link;
    this._handleCardClick = handleCardClick;
  };

  _handleDeleteButtonClick(evt) {
    evt.target.closest('.element').remove();
  };

  _likeActive(evt) {
    evt.target.classList.toggle('element__like_type_active');
  };

  _openPopupImg() {
    this._handleCardClick(this._cardUrl, this._cardName);
  };

  _setListenersCard() {
    this._trashButton.addEventListener('click', this._handleDeleteButtonClick);
    this._likeButton.addEventListener('click', this._likeActive);
    this._imageClick.addEventListener('click', () => this._openPopupImg());
  };

  createCard() {
    this.cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._trashButton = this.cardElement.querySelector('.element__trash')
    this._likeButton = this.cardElement.querySelector('.element__like');
    this._imageClick = this.cardElement.querySelector('.element__img');
    this.cardElement.querySelector('.element__text').textContent = this._cardName;
    this._imageClick.src = this._cardUrl;
    this._imageClick.alt = this._cardName;
    this._setListenersCard();
    return this.cardElement;
  };
};

export default Card;



