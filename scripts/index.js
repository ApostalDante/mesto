const editProfiletButton = document.querySelector(".profile__edit-btm");
const popup = document.querySelector(".popup");
const formElement = document.querySelector(".form");
const closePopupButton = popup.querySelector(".popup__close");

editProfiletButton.addEventListener("click", editProfiletButtonClick);
popup.addEventListener("click", handleOverlyClick);
closePopupButton.addEventListener("click", closePopupButtonClick);
formElement.addEventListener('submit', handleFormSubmit);

function toggleOpenPopup() {
  popup.classList.toggle("popup_opened");
  getValuePlaceholder();
}

function editProfiletButtonClick() {
  toggleOpenPopup();
}

function closePopupButtonClick() {
  toggleOpenPopup();
}

function handleOverlyClick(event) {
  if (event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}

function cleanValueForm() {
  let userName = document.querySelector(".form__user-name");
  userName.value = "";
  let userMysel = document.querySelector(".form__user-myself");
  userMysel.value = "";
}

function changeValuePlaceholder(str) {
  let userName = document.querySelector(".form__user-name");
  let userMysel = document.querySelector(".form__user-myself");
  cleanValueForm();
  userName.placeholder = str;
  userMysel.placeholder = str;
}

function getValuePlaceholder() {
  let userName = document.querySelector(".form__user-name");
  userName.placeholder = document.querySelector(".profile__user-name").textContent;
  let userMysel = document.querySelector(".form__user-myself");
  userMysel.placeholder = document.querySelector(".profile__user-myself").textContent;
  cleanValueForm();
}

function sendingUserForm() {
  let userNameValue = document.querySelector(".form__user-name").value;
  let userMyselValue = document.querySelector(".form__user-myself").value;
  if (userNameValue != '' && userMyselValue != '') {
    if (userNameValue.length > 2 && userMyselValue.length > 2) {
      document.querySelector(".profile__user-name").textContent = userNameValue;
      document.querySelector(".profile__user-myself").textContent = userMyselValue;
      closePopupButtonClick();
    } else {
      changeValuePlaceholder("В строках должно быть больше трёх символов");
    }
  } else {
    changeValuePlaceholder("Строки должны быть заполнены");
  }
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  sendingUserForm();
}