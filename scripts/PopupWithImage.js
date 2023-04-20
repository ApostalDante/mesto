import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImageLink = this._popup.querySelector('.popup__image');
    this._popupTitle = this._popup.querySelector('.popup__title');
  };

  open(link, title) {
    this._popupImageLink.src = link;
    this._popupImageLink.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  };
};

export default PopupWithImage;
