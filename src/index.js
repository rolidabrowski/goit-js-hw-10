import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

searchEl.addEventListener(
  'input',
  debounce(async event => {
    const countryName = event.target.value;

    if (countryName === '') {
      countryListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      return;
    }

    try {
      const countries = await fetchCountries(countryName);

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else {
        renderCountriesList(countries);
      }

      if (countries.length === 1) {
        renderInfoList(countries);
      }
    } catch (error) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
  }, DEBOUNCE_DELAY)
);

function renderCountriesList(countries) {
  const list = countries
    .map(
      country =>
        `<li class="country-item"><img height="24" src="${country.flags.png}" />${country.name.common}</li>`
    )
    .join('');
  countryListEl.innerHTML = list;
}

function renderInfoList(countries) {
  const info = countries
    .map(
      country => `
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <p>Languages: ${Object.values(country.languages).join(', ')}</p>
    `
    )
    .join('');
  countryInfoEl.innerHTML = info;
}
