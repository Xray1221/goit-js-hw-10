import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

import './css/styles.css';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce((event) => {
    clearDom();
    const countryName = event.target.value.trim();
    if(countryName === '') {
        return;
    }

    fetchCountries(countryName)
    .then((response) => response.json())
    .then((data) => {
        if(data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
        }else if(data.length === 1) {
            refs.countryList.insertAdjacentHTML("beforeend", createCountriesMarcup(data));
            refs.countryInfo.insertAdjacentHTML("beforeend", createCountryInfoMarkup(data[0]));
        }else {
            refs.countryList.insertAdjacentHTML("beforeend", createCountriesMarcup(data));  
        }
    }).catch((error) => {
        Notify.failure("Oops, there is no country with that name");
    });
}, DEBOUNCE_DELAY));

function createCountriesMarcup(countries) {
    return countries.map((item) => {
        return `<li class="country-list__item">
            <img class="country-list__flag" src="${item.flags.svg}" />
            <span class="country-list__name">${item.name.official}</span>
        </li>`;
    }).join('');
};

function createCountryInfoMarkup(country) {
    return `
        <p><b>Capital:</b> ${country.capital[0]}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> ${Object.values(country.languages).join(', ')}</p>
    `;
}

function clearDom() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}