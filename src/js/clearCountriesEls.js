import getMarkupElements from './getMarkupElements';
const refs = getMarkupElements();

function clearCountriesEls() {
  refs.countriesListContainer.innerHTML = '';
  refs.singleCountryContainer.innerHTML = '';
}

export default clearCountriesEls;
