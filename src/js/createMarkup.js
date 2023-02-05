import countryItemTemplate from '../templates/country-item.hbs'
import countryListTemplate from '../templates/country-list.hbs'

function createCountryInfoItemMarkup(country) {
    return countryItemTemplate(country);
  }
  
  function createCountryListItemMarkup(country) {
    return countryListTemplate(country);
  }

  export {createCountryInfoItemMarkup, createCountryListItemMarkup};
  