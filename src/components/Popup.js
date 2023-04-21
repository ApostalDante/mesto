class Popup {
  constructor(popup) {
    this._popup = popup;
    this._buttonClosePopup = this._popup.querySelector('.popup__close');
  };

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape')
      this.close();
  };

  _clickOverBorderPopup = (evt) => {
    if (evt.target === evt.currentTarget)
      this.close();
  };

  open() {
    this._popup.classList.add('popup_opened');
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._clickOverBorderPopup);
  };

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._clickOverBorderPopup);
    this._buttonClosePopup.addEventListener('click', () => this.close());
  };
};

export default Popup;