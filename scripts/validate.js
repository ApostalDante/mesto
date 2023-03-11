function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.formInputTypeClass);
  errorElement.classList.remove(options.formInputErrorClass);
  errorElement.textContent = '';
};

function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.formInputTypeClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.formInputErrorClass);
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(options.formSetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, options);
    });
  });
}

function setEventListeners(formElement, options) {
  const inputList = Array.from(formElement.querySelectorAll(options.formInputSelector));
  const buttonElement = formElement.querySelector(options.formSaveSelector);

  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, options);
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid)
};

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(options.buttonInactiveClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(options.buttonInactiveClass);
  }
}

const options = {
  formSelector: '.form',
  formSetSelector: '.form__set',
  formInputSelector: '.form__input',
  formSaveSelector: '.form__save',
  formInputTypeClass: 'form__input_type_error',
  formInputErrorClass: 'form__input-error_active',
  buttonInactiveClass: 'form__save_disablet',
}


enableValidation(options);

function closetInputError(options) {
  const formList = Array.from(document.querySelectorAll(options.formSetSelector));
  formList.forEach(el => {
    const errorInput = document.querySelector('.form__input_type_error');
    const erorrSpan = document.querySelector('.form__input-error_active');
    errorInput.classList.remove('form__input_type_error');
    erorrSpan.classList.remove('form__input-error_active');
  })
}

