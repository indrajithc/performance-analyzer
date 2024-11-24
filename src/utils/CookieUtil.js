export const setCookie = (name, value, days) => {
  const expires = days
    ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
    : '';
  document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
};

export const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(row => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; Max-Age=-1; path=/`;
};
