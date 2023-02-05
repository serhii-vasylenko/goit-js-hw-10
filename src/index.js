import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './js/fetchCountries';
import getMarkupElements from './js/getMarkupElements';
import clearCountriesEls from './js/clearCountriesEls';
import renderMarkup from './js/renderMarkup';

Notify.init({
  fontSize: '16px',
  width: '300px',
});

const DEBOUNCE_DELAY = 300;
const refs = getMarkupElements();

refs.searchBoxInput.addEventListener(
  'input',
  debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch({ target }) {
  const query = target.value.toLowerCase().trim();

  if (!query) {
    clearCountriesEls();
    return;
  }

  fetchCountries(query)
    // .then(result =>
    //   result.filter(({ name: { common } }) =>
    //     common.toLowerCase().includes(query)
    //   )
    // )
    .then(renderMarkup)
    .catch(e => {
      clearCountriesEls();
      Notify.warning(Error(e).stack);
    });
}

window.onload = () => document.querySelector('#search-box').focus();
