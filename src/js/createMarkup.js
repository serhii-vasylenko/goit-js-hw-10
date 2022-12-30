function createCountryInfoItemMarkup(country) {
    const { flags, name, capital, population, languages } = country;
    const markup = `
    <div class="country-info__tumb">
      <img class="country-info__flag" src="${flags.svg}" alt="${name.common}" width="50">
      <p class="country-info__name title">${name.common}</p>
    </div>
    <p>Capital: <span>${capital}</span></p>
    <p>Population: <span>${population}</span></p>
    <p>Languages: <span>${Object.values(languages).join(', ')}</span></p>
    `;
    return markup;
  }
  
  function createCountryListItemMarkup(country) {
    const { flags, name } = country;
    const markup = `<li class="country-list__item">
        <img class="country-list__flag" src="${flags.svg}" alt="${name.common}">
        <p class="country-list__name">${name.common}</p>
    </li>`;
    return markup;
  }

  export {createCountryInfoItemMarkup, createCountryListItemMarkup};