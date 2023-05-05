class UserInfo {
  constructor({ userNameProfile, userMyselProfile, userAvatarProfile }) {
    this._userName = document.querySelector(`.${userNameProfile}`);
    this._userMysel = document.querySelector(`.${userMyselProfile}`);
    this._userAvatar = document.querySelector(`.${userAvatarProfile}`);
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
  };

  setUserAvatar(avatarLink) {
    this._userAvatar.src = avatarLink;
  };
};

export default UserInfo;
