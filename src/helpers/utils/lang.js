import { vi, en, } from '~/languages';

export const translate = (str) => {
  let translation;
  const lang = getLang() || 'vi';
  if(lang === 'en') {
    translation = en[str];
  }
  else {
    translation = vi[str];
  }
  return translation !== undefined ? translation : str;
};

export const setLang = (lang) => {
  localStorage.setItem('lang', lang);
};

export const getLang = () => {
  return localStorage.getItem('lang');
};