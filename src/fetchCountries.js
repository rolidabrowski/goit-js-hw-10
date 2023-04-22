const API_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = async name => {
  const response = await fetch(`
  ${API_URL}/${name}?fields=name,population,capital,flags,languages
  `);
  return await response.json();
};
