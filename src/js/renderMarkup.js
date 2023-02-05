import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getMarkupElements from './getMarkupElements';
import clearCountriesEls from './clearCountriesEls';
import clearMarkup from './clearMarkup';
import {
  createCountryInfoItemMarkup,
  createCountryListItemMarkup,
} from './createMarkup';

const refs = getMarkupElements();

function renderMarkup(countriesList) {
  {
    switch (true) {
      case countriesList.length === 1:
        clearMarkup(refs.countriesListContainer);
        refs.singleCountryContainer.innerHTML = createCountryInfoItemMarkup(
          ...countriesList
        );
        break;

      case countriesList.length > 1 && countriesList.length <= 10:
        clearMarkup(refs.singleCountryContainer);
        refs.countriesListContainer.innerHTML = createCountryListItemMarkup(
          [...countriesList].sort((countryA, countryB) =>
            countryA.name.common.localeCompare(countryB.name.common)
          )
        );
        break;

      case countriesList.length > 10:
        clearCountriesEls();
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        break;

      case countriesList.length === 0:
        clearCountriesEls();
        Notify.failure('Oops, there is no country with that name');
        break;
    }
  }
}

export default renderMarkup;
