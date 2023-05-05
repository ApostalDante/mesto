import Popup from '/src/components/Popup.js';

class PopupConfilmDelete extends Popup {
  constructor(popup, { callbackSubmitForm }) {
    super(popup);
    this._popupForm = this._popup.querySelector('.form');
    this._callbackSubmitForm = callbackSubmitForm;
  };

  open(cardObject, cardId) {
    this._cardObject = cardObject;
    this._cardId = cardId;
    super.open();
  };

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._cardObject, this._cardId)
    });
    super.setEventListeners();
  };
};

export default PopupConfilmDelete;