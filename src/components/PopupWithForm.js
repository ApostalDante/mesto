import Popup from '/src/components/Popup.js';

class PopupWithForm extends Popup {
  constructor(popup, { callbackSubmitForm }) {
    super(popup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this._popup.querySelector('.form');
    this._popupInputs = Array.from(this._popup.querySelectorAll('.form__input'));
    this._buttonConfirm = this._popup.querySelector('.form__save');
    this._buttonConfirmText = this._buttonConfirm.textContent;
  };

  _getInputValues() {
    this._formValues = {};
    this._popupInputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  };

  close() {
    super.close();
    this._popupForm.reset();
  };

  showProcessSaving() {
    this._buttonConfirm.textContent = 'Сохранение...';
  };

  offShowProcessSaving() {
    this._buttonConfirm.textContent = this._buttonConfirmText;
  };
};

export default PopupWithForm;