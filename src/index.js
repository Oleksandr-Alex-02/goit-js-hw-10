import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const reft = {
  searcBbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const fetchUrl = 'https://restcountries.com/v3.1/name/';
const paranetrs = 'fields=name,capital,population,flags,languages';

function countrySearch(city) {
  const response = fetch(`${fetchUrl}${city}?${paranetrs}`)
    .then(res => res.json())
    .then(data => array(data));
  return response;
}

function array(obj) {
  console.log(obj);
}

reft.searcBbox.addEventListener('input', pole);

function pole() {
  const city = reft.searcBbox.value;
  countrySearch(city);
}
