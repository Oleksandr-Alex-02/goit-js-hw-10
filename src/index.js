import './css/styles.css';
import './css/countryJS.css';
import countrySearch from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '400px',
  position: 'right-top',
  distance: '10px',
  borderRadius: '50px',
});

const DEBOUNCE_DELAY = 2000;

const reft = {
  searcBbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

reft.searcBbox.addEventListener('input', debounce(pole, DEBOUNCE_DELAY));

function pole() {
  const city = reft.searcBbox.value.trim();
  countrySearch(city).then(proverka);
}

function proverka(obj) {
  errorInput();
  if (obj.length === 1) {
    countryInfo(obj);
    return;
  }
  if (obj.length <= 10) {
    countryList(obj);
    return;
  }
}

function countryList(obj) {
  const markap = obj
    .map(country => {
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
      const keys = Object.values(country.languages).join(', ');
      return `
      <div class="country_div"><img class="country_img" src="${country.flags.svg}" alt="${country.name.official}" height="25" width="40"><h1>${country.name.official}</h1></div> 
  <ul>
    <li class="country_list"><h3>Capital:</h3> <span>${country.capital}</span></li>
    <li class="country_list"><h3>Population:</h3> <span>${country.population}</span></li>
    <li class="country_list"><h3>Languages:</h3> <span>${keys}</span></li>
  </ul>
    `;
    })
    .join('');

  reft.countryInfo.insertAdjacentHTML('beforeend', markap);
}

function errorInput() {
  const div = reft.countryList.textContent;
  const ul = reft.countryInfo.textContent;

  const input = reft.searcBbox.value;
  if (input.length === 1) {
    reft.countryInfo.textContent = '';
    reft.countryList.textContent = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (ul) {
    reft.countryInfo.textContent = '';
    console.log('для ул');
    return;
  } else {
    reft.countryList.textContent = '';
    console.log('для дів');
    return;
  }
}

// function capitalerror() {
//   const ru = reft.searcBbox.value;
//   if (ru === ru || russ) {
//     reft.countryList.textContent = '';
//     Notiflix.Notify.failure('capital error 404');
//     return;
//   }
//   if (obj.length <= 10) {
//     countryList(obj);
//     return;
//   }
// }
