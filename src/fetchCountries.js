const fetchUrl = 'https://restcountries.com/v3.1/name/';
const paranetrs = 'fields=name,capital,population,flags,languages';

export default function countrySearch(city) {
  return fetch(`${fetchUrl}${city}?${paranetrs}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
