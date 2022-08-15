import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const reft = {
  searcBbox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

reft.searcBbox, addEventListener('input', pole);

console.log(reft.searcBbox);

function pole() {
  reft.countryList.textContent = reft.searcBbox.value;
  console.log(reft.searcBbox.value);
}
