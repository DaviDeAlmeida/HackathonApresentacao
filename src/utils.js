const nextTick = (payload) => {

  setTimeout(() => {

    payload();

  }, 0);

};

const formatCpf = (cpfNumber) => cpfNumber && cpfNumber.replace(/(\d{3}|\W{3})(\d{3}|\W{3})(\d{3}|\W{3})/g, '$1.$2.$3-');

const formatZipcode = (zipcodeNumber) => zipcodeNumber && zipcodeNumber.replace(/(\d{5})(\d{3})/g, '$1-$2');

const getCookie = (name) => {

  const match = document.cookie.match(new RegExp(`(^| )${name.toString()}=([^;]+)`));
  if (!match) return null;
  return match[2];

};

const setCookie = (name, value, days) => {

  let expires = '';

  if (days) {

    const d = new Date();
    const tmp = d.getTime() + (24 * 60 * 60 * 1000) * days;
    d.setTime(tmp);
    expires = `;expires=${d.toGMTString()}`;

  }

  document.cookie = `${name}=${value};path=/;domain=.centauro.com.br${expires};secure`;

};

const deleteCookie = (cname) => {

  const d = new Date();
  d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `${cname}=; '${expires}`;

};

const isMobileDevice = window && navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);

export {
  nextTick,
  formatCpf,
  formatZipcode,
  getCookie,
  setCookie,
  deleteCookie,
  isMobileDevice,
};
