import cookie from 'js-cookie';
import nextCookie from 'next-cookies';

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: '/'
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};



export const getCookie = (key, ctx) => {
  const cookie = nextCookie(ctx);
  return cookie[key];
};
