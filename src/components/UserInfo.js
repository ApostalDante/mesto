class UserInfo {
  constructor({ userNameProfile, userMyselProfile }) {
    this._userName = document.querySelector(`.${userNameProfile}`);
    this._userMysel = document.querySelector(`.${userMyselProfile}`);
  };

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userMysel: this._userMysel.textContent,
    }
  };

  setUserInfo({ userName, userMysel }) {
    this._userName.textContent = userName;
    this._userMysel.textContent = userMysel;
  }
};

export default UserInfo;
