const getIsAuthenticated = state => state.auth.isLogin;

const getUserName = state => state.auth.user.name;

const getUserAvatar = state => state.auth.user.avatarURL;

const getFetchigCurrentUser = state => state.auth.isFetchigCurrentUser;

const getCurrentToken = state => state.auth.token;

const getStatusLogout = state => state.auth.logout;

export {
  getIsAuthenticated,
  getUserName,
  getFetchigCurrentUser,
  getCurrentToken,
  getUserAvatar,
  getStatusLogout,
};
