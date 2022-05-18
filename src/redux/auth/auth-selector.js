const getIsAuthenticated = state => state.auth.isLogin;

const getUserName = state => state.auth.user.name;

const getUserEmail = state => state.auth.user.email;

const getUserAvatar = state => state.auth.user.avatarURL;

const getUserSubscription = state => state.auth.user.subscription;

const getFetchigCurrentUser = state => state.auth.isFetchigCurrentUser;

const getCurrentToken = state => state.auth.token;

const getStatusLogout = state => state.auth.logout;

const getMessageRepeatEmailVerify = state => state.auth.isRepeatEmailVerify;

const getСurrentLocalization = state => state.auth.localization;

export {
  getIsAuthenticated,
  getUserName,
  getFetchigCurrentUser,
  getCurrentToken,
  getUserAvatar,
  getUserSubscription,
  getStatusLogout,
  getUserEmail,
  getMessageRepeatEmailVerify,
  getСurrentLocalization,
};
