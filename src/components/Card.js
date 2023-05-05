class Card {
  constructor(cardObg, cardTemplate, userId, dataCard, handleCard) {
    this._cardTemplate = document.querySelector(cardTemplate).content;
    this._cardObg = cardObg;
    this._cardName = cardObg.name;
    this._cardUrl = cardObg.link;
    this._userId = userId;
    this._cardId = dataCard.cardId;
    this._authorId = dataCard.authorId;
    this._handleCardClick = handleCard.handleCardClick;
    this._handleCardConfirmDelete = handleCard.handleCardConfirmDelete;
    this._handleCardAddLike = handleCard.handleCardAddLike;
    this._handleCardDeleteLike = handleCard.handleCardDeleteLike;
  };

  deleteCard() {
    this.cardElement.remove();
    this.cardElement = null;
  };

  _checkLikeInCard() {
    return this._likeCount.find((userLike) => userLike._id === this._userId);
  };

  _likeActive() {
    if (this._checkLikeInCard()) {
      this._handleCardDeleteLike(this._cardId);
    } else {
      this._handleCardAddLike(this._cardId);
    }
  };

  _openPopupImg() {
    this._handleCardClick(this._cardUrl, this._cardName);
  };

  renderLikeInCard(card) {
    this._likeCount = card.likes;
    if (this._likeCount.length === 0) {
      this.likeSelector.textContent = '0';
    } else {
      this.likeSelector.textContent = this._likeCount.length;
    }
    if (this._checkLikeInCard()) {
      this._likeButton.classList.add('element__like_type_active');
    } else {
      this._likeButton.classList.remove('element__like_type_active');
    }
  };

  _setListenersCard() {
    if (this._userId === this._authorId) {
      this._trashButton.addEventListener('click', () => this._handleCardConfirmDelete(this, this._cardId));
    } else {
      this._trashButton.remove();
    }
    this._likeButton.addEventListener('click', () => this._likeActive());
    this._imageClick.addEventListener('click', () => this._openPopupImg());
  };

  createCard() {
    this.cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._trashButton = this.cardElement.querySelector('.element__trash')
    this._likeButton = this.cardElement.querySelector('.element__like');
    this._imageClick = this.cardElement.querySelector('.element__img');
    this.likeSelector = this.cardElement.querySelector('.element__like-count');
    this.cardElement.querySelector('.element__text').textContent = this._cardName;
    this._imageClick.src = this._cardUrl;
    this._imageClick.alt = this._cardName;
    this.renderLikeInCard(this._cardObg);
    this._setListenersCard();
    return this.cardElement;
  };
};

export default Card;
