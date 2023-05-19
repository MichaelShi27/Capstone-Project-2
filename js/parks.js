import { parkTypes } from './data/parkTypeData.js';
import { parks } from './data/nationalParkData.js';
import { locations } from './data/locationData.js';

import { qS, qSA, setDisplay } from './helpers.js';

const parkSelect = qS('#parks-select');
const parkList = qS('#parks-list');

window.onload = () => {
  qSA('button').forEach(btn => btn.onclick = populateParkSelect);
};

const populateParkSelect = e => {
  parkSelect.options.length = 0;
  parkList.innerHTML = '';

  const options = e.target.textContent === 'Location' ? locations : parkTypes;
  
  setDisplay(parkSelect, 'block');
  parkSelect.add( new Option('Select an option', 'default') );

  for (const option of options)
    parkSelect.add( new Option(option, option) );

  parkSelect.onchange = () => displayParks(e.target.textContent);
};

const displayParks = searchType => {
  parkList.innerHTML = '';

  const selected = parkSelect.value;
  if (selected === 'default') return;

  const filteringFunc = ({ state, name }) => searchType === 'Location' ? state === selected : name.includes(selected);
  const selectedParks = parks.filter(filteringFunc);

  for (const selectedPark of selectedParks) {
    const { name, city, state } = selectedPark;

    const parkLi = document.createElement('li');
    parkList.appendChild(parkLi);
    parkLi.innerHTML = `
      <div class="d-flex justify-content-between">
        <span>${name}</span>
        <span>${city}, ${state}</span>
      </div>
    `;

    parkLi.onclick = () => displayParkInfo(parkLi, selectedPark);
  }
};

const displayParkInfo = (parkLi, selectedPark) => {
  const { id, name, address, city, state, zipCode, phone, fax } = selectedPark;

  if ( qS(`button#${id}-close`) ) return; // if a button already exists for this park

  const contact = phone || (fax ? `Fax: ${fax}` : '');
  parkLi.innerHTML = `
    <div class="selectedPark">
      <div>${name}</div>
      <span class="m-3">${address}</span>
      <span class="m-3">${city}</span>
      <span class="m-3">${state}</span>
      <span class="m-3">${zipCode}</span>
      <div>${contact}</div>
    </div>
  `;
  const btnStr = `<button id="${id}-close" class="close-btn">Close</button>`;
  parkLi.insertAdjacentHTML('afterend', btnStr);
  
  qS(`button#${id}-close`).onclick = function() {
    parkLi.innerHTML = name;
    this.remove();
  };
};
