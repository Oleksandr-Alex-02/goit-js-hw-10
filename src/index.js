import './css/styles.css';
import './css/countryJS.css';
import img from './img/87457103-1782376.jpg';
import countrySearch from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
});

const DEBOUNCE_DELAY = 300;

const reft = {
  searcBbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

reft.searcBbox.addEventListener('input', debounce(pole, DEBOUNCE_DELAY));

function pole() {
  const city = reft.searcBbox.value.trim();
  countrySearch(city).then(callКesult).catch(error);
}

function error() {
  errorInput();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function callКesult(obj) {
  errorInput();

  if (obj.length === 1) {
    countryInfo(obj);
    return;
  } else if (obj.length <= 10) {
    countryList(obj);
    return;
  } else if (obj.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function errorInput() {
  reft.countryInfo.textContent = '';
  reft.countryList.textContent = '';
}

function countryList(obj) {
  const markap = obj
    .map(country => {
      if (country.name.common == 'Russia') {
        return `
       <li class="li"><img class="country_img" src="${img}" alt="${country.name.official}" height="25" width="40"></img><p>ERROR 404</p>
  </li>
        `;
      }
      return `
    <li class="li"><img class="country_img" src="${country.flags.svg}" alt="${country.name.official}" height="25" width="40"></img><p>${country.name.official}</p>
  </li>
    `;
    })
    .join('');

  reft.countryList.insertAdjacentHTML('beforeend', markap);
}

function countryInfo(obj) {
  const markap = obj
    .map(country => {
      const value = Object.values(country.languages).join(', ');
      if (country.name.common == 'Russia') {
        return `
      <div class="country_div"><img class="country_img" src="${img}" alt="${country.name.official}" height="25" width="40"><h1>ERROR 404</h1></div> 
  <ul>
    <li class="country_list"><h3>Capital:</h3> <span>Swamp</span></li>
    <li class="country_list"><h3>Orcs:</h3> <span>${country.population}</span></li>
    <li class="country_list"><h3>Languages:</h3> <span>terror</span></li>
  </ul>
        `;
      }
      return `
      <div class="country_div"><img class="country_img" src="${country.flags.svg}" alt="${country.name.official}" height="25" width="40"><h1>${country.name.official}</h1></div> 
  <ul>
    <li class="country_list"><h3>Capital:</h3> <span>${country.capital}</span></li>
    <li class="country_list"><h3>Population:</h3> <span>${country.population}</span></li>
    <li class="country_list"><h3>Languages:</h3> <span>${value}</span></li>
  </ul>
    `;
    })
    .join('');

  reft.countryInfo.insertAdjacentHTML('beforeend', markap);
}
