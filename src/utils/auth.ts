const TOKEN_KEY = 'token';
const USERINFO_KEY = 'userinfo';

const isLogin = () => {
  const loginConfigString = localStorage.getItem('login-config');
  let isLoggedIn = false;
  if (loginConfigString !== null) {
    isLoggedIn = JSON.parse(loginConfigString).rememberPassword;
  }
  return !!loginConfigString || isLoggedIn;
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const clearUserInfo = () => {
  localStorage.removeItem(USERINFO_KEY);
};

export { isLogin, getToken, setToken, clearToken, clearUserInfo };
