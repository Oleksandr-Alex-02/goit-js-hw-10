import './css/styles.css';
import countrySearch from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const reft = {
  searcBbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

reft.searcBbox.addEventListener('input', pole);

function pole() {
  const city = reft.searcBbox.value;
  if (city.length === 3) {
    countrySearch(city)
      .then(data => countries(data))
      .catch(error => {
        console.error('error');
      });
  }
  if (city.length === 0) {
    reft.countryList.textContent = '';
    reft.countryInfo.textContent = '';
  }
}

function countries(obj) {
  // const name = obj[0].name.official;
  // const capital = obj[0].capital;
  // const flags = obj[0].flags.svg;
  // const languages = obj[0].languages;
  // const population = obj[0].population;

  const markap = obj.map(({ name, flags: { svg } }) => {
    return `
    <img src="${svg}" alt="${name}" height="25" width="40"></img><p>${name}</p></li>
    `;
  });

  reft.countryList.insertAdjacentHTML('beforeend', markap);
}
