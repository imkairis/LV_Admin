const getThemeMode = () => {
  return localStorage.getItem('theme');
};

const setThemeMode = () => {
  let theme = getThemeMode() === 'light' ? 'dart' : 'light';
  return localStorage.setItem('theme', theme);
};

export { getThemeMode, setThemeMode, };