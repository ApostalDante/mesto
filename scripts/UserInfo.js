class UserInfo {
  constructor(userName, userMysel) {
    this._userName = userName;
    this._userMysel = userMysel;
    this._userNameProfile = document.querySelector('.profile__user-name');
    this._userMyselProfile = document.querySelector('.profile__user-myself');
  };

  getUserInfo() {
    this._userName.value = this._userNameProfile.textContent;
    this._userMysel.value = this._userMyselProfile.textContent;
  };

  setUserInfo() {
    this._userNameProfile.textContent = this._userName.value;
    this._userMyselProfile.textContent = this._userMysel.value;
  };
};

export default UserInfo;
