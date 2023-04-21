class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._options.formSaveSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.formInputSelector));
    this._formSpanError = Array.from(document.querySelectorAll(this._options.formSpanErorClass));
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.formInputTypeClass);
    errorElement.classList.remove(this._options.formInputErrorClass);
    errorElement.textContent = '';
  };

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.formInputTypeClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.formInputErrorClass);
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputItem) => !inputItem.validity.valid);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'true');
      this._buttonElement.classList.add(this._options.buttonInactiveClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._options.buttonInactiveClass);
    }
  };

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement);
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  };
};

export default FormValidator;
