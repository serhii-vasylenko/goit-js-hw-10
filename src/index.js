import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './js/fetchCountries';
import { createCountryInfoItemMarkup, createCountryListItemMarkup } from "./js/createMarkup";
import debounce from 'lodash.debounce';

Notify.init({
  fontSize: '16px',
  width: '300px',
});

const DEBOUNCE_DELAY = 1000;

const refs = {
  searchBoxInput: document.querySelector('#search-box'),
  countriesListContainer: document.querySelector('.country-list'),
  singleCountryContainer: document.querySelector('.country-info'),
};

refs.searchBoxInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const query = event.target.value.trim();

  if (!query) {
    clearCountriesEls();
    return;
  }

  fetchCountries(query)
    .then(countriesList => {
      switch (true) {
        case countriesList.length === 1:
          refs.singleCountryContainer.innerHTML = createCountryInfoItemMarkup(
            ...countriesList
          );
          refs.countriesListContainer.innerHTML = '';
          break;

        case countriesList.length > 1 && countriesList.length <= 10:
          refs.singleCountryContainer.innerHTML = '';
          refs.countriesListContainer.innerHTML = countriesList
            .map(country => createCountryListItemMarkup(country))
            .join('');
          break;

        case countriesList.length > 10:
          clearCountriesEls();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          break;
      }
    })
    .catch(() => {
      clearCountriesEls();
      Notify.failure('Oops, there is no country with that name');
    });
}

// function createCountryInfoItemMarkup(country) {
//   const { flags, name, capital, population, languages } = country;
//   const markup = `
//   <div class="country-info__tumb">
//     <img class="country-info__flag" src="${flags.svg}" alt="${name.common}" width="50">
//     <p class="country-info__name title">${name.common}</p>
//   </div>
//   <p>Capital: <span>${capital}</span></p>
//   <p>Population: <span>${population}</span></p>
//   <p>Languages: <span>${Object.values(languages).join(', ')}</span></p>
//   `;
//   return markup;
// }

// function createCountryListItemMarkup(country) {
//   const { flags, name } = country;
//   const markup = `<li class="country-list__item">
//       <img class="country-list__flag" src="${flags.svg}" alt="${name.common}">
//       <p class="country-list__name">${name.common}</p>
//   </li>`;
//   return markup;
// }

function clearCountriesEls() {
  refs.countriesListContainer.innerHTML = '';
  refs.singleCountryContainer.innerHTML = '';
}