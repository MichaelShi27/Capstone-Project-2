import { parkTypes } from './data/parkTypeData.js';
import { parks } from './data/nationalParkData.js';
import { locations } from './data/locationData.js';

import { qS, qSA, setDisplay, hideElements } from './helpers.js';

const parkSelect = qS('#parks-select');
const parkList = qS('#parks-list');

window.onload = () => {
  qSA('button.searchTypeBtn').forEach(btn => btn.onclick = e => {
    populateParkSelect(e);
    toggleSelectedBtn(e);
  });
};

const populateParkSelect = e => {
  parkSelect.options.length = 0;
  parkList.innerHTML = '';
  setDisplay(parkSelect, 'block');

  const typeSelected = e.target.value === 'type';
  const options = typeSelected ? parkTypes : locations;
    
  const defaultStr = `Select a ${typeSelected ? 'park type' : 'location'}`;
  parkSelect.add( new Option(defaultStr, 'default') );

  for (const option of options)
    parkSelect.add( new Option(option, option) );

  parkSelect.onchange = () => displayParks(e.target.value);
};

const toggleSelectedBtn = e => {
  const typeBtnSelected = e.target.value === 'type';
  qS(`#${typeBtnSelected ? 'type' : 'location'}Btn`).classList.add('selected');
  qS(`#${typeBtnSelected ? 'location' : 'type'}Btn`).classList.remove('selected');
};

const displayParks = searchType => {
  parkList.innerHTML = '';

  const selected = parkSelect.value;
  if (selected === 'default') return;
    
  const filteringFunc = ({ state, name }) => searchType === 'location' ? state === selected : name.includes(selected);
  const selectedParks = parks.filter(filteringFunc);

  for (const selectedPark of selectedParks) {
    const { name, city, state } = selectedPark;

    const parkLi = document.createElement('li');
    parkList.appendChild(parkLi);

    const parkLiStr = `
      <div class="d-flex justify-content-between">
        <span class="park-li-name m-3"><h6>${name}</h6></span>
        <span class="m-3">${city}, ${state}</span>
      </div>
    `;
    parkLi.innerHTML = parkLiStr;

    parkLi.onclick = () => displayParkInfo(parkLi, selectedPark, parkLiStr);
  }
};

const displayParkInfo = (parkLi, selectedPark, parkLiStr) => {
  const { id, name, address, city, state, zipCode, phone, fax } = selectedPark;

  if ( qS(`button#${id}-close`) ) return; // if a button already exists for this park

  const contact = phone || (fax ? `Fax: ${fax}` : '');
  parkLi.innerHTML = `
    <div class="selected-park d-flex justify-content-between">
      <h5 class="d-flex align-items-center">${name}</h5>
      <div class="park-info">
        <div class="${address ? 'm-1' : ''}">${address || ''}</div>
        <div class="m-1">${city}, ${state} ${zipCode || ''}</div>
        <div class="${contact ? 'm-1' : ''}">${contact || ''}</div>
      </div>
      <button id="${id}-close" class="close-btn">x</button>
    </div>
  `;
  
  // rewrite onclick, otherwise clicking btn will just trigger the original parkLi.onclick again
  parkLi.onclick = null; 

  qS(`button#${id}-close`).onclick = () => {
    parkLi.innerHTML = parkLiStr;
    
    // w/o setTimeout, clicking the btn still triggers the onclick re-assigned below
    setTimeout(() => parkLi.onclick = () => displayParkInfo(parkLi, selectedPark, parkLiStr), 500);
  };
};
