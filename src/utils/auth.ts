const TOKEN_KEY = 'token';

const isLogin = () => {
  // Todo: 保持登录
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

export { isLogin, getToken, setToken, clearToken };
