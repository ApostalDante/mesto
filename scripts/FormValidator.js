class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._options.formSaveSelector);
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
    const inputList = Array.from(this._formElement.querySelectorAll(this._options.formInputSelector));

    this._toggleButtonState();

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return Array.from(this._formElement.querySelectorAll(this._options.formInputSelector)).some((inputItem) => {
      return !inputItem.validity.valid;
    });
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

  _closetInputError() {
    const formInputError = Array.from(document.querySelectorAll(this._options.formInputSelector));
    const formSpanError = Array.from(document.querySelectorAll(this._options.formSpanErorClass));
    if (!this._buttonElement.classList.contains(this._options.buttonInactiveClass)) {
      this._buttonElement.setAttribute('disabled', 'true');
      this._buttonElement.classList.add(this._options.buttonInactiveClass);
    };
    formInputError.forEach(el => {
      if (el.classList.contains(this._options.formInputTypeClass)) {
        el.classList.remove(this._options.formInputTypeClass);
      }
    });
    formSpanError.forEach(el => {
      if (el.classList.contains(this._options.formInputErrorClass)) {
        el.classList.remove(this._options.formInputErrorClass);
      }
    });
  };

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._options.formSelector));
    this._closetInputError();
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      formList.forEach((formElement) => {
        this._setEventListeners(formElement);
      });
    });
  };
};

export default FormValidator;
