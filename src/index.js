import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import {
  createCountryInfoItemMarkup,
  createCountryListItemMarkup,
} from './js/createMarkup';
import getMarkupElements from './js/getMarkupElements';
import clearCountriesEls from './js/clearCountriesEls';

Notify.init({
  fontSize: '16px',
  width: '300px',
});

const DEBOUNCE_DELAY = 1000;

const refs = getMarkupElements();

refs.searchBoxInput.addEventListener(
  'input',
  debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch({target}) {
  const query = target.value.toLowerCase().trim();

  if (!query) {
    clearCountriesEls();
    return;
  }

  fetchCountries(query)
    .then(result =>
      result.filter(({ name: {common} }) => common.toLowerCase().includes(query))
    )
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
          refs.countriesListContainer.innerHTML = [...countriesList]
            .sort((countryA, countryB) =>
              countryA.name.common.localeCompare(countryB.name.common)
            )
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
