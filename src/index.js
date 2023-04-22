import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const searchEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

searchEl.addEventListener(
  'input',
  debounce(async event => {
    const countryName = event.target.value;

    if (countryName === '') {
      countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      return;
    }

    const countries = await fetchCountries(countryName);

    if (countries.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else {
      countryListEl.innerHTML = countries
        .map(
          country =>
            `<li><img width="16" height="16" src="${country.flags.png}" />${country.name.common}</li>`
        )
        .join('');
    }

    if (countries.length === 1) {
      countryInfoEl.innerHTML = `
      <p>Capital: ${countries[0].capital}</p>
      <p>Population: ${countries[0].population}</p>
      <p>Languages: ${Object.values(countries[0].languages).join(', ')}</p>
      `;
    }
  }, DEBOUNCE_DELAY)
);
