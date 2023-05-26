import { parkTypes } from './data/parkTypeData.js';
import { parks } from './data/nationalParkData.js';
import { locations } from './data/locationData.js';

import { qS, qSA, setDisplay } from './helpers.js';

const clearElements = (...elements) => elements.forEach(el => el.innerHTML = '');

const parkSelect = qS('#parks-select');
const parkList = qS('#parks-list');
const countMsg = qS('#count-msg');

window.onload = () => qSA('button.searchTypeBtn').forEach(
  btn => (btn.onclick = e => {
    populateParkSelect(e);
    toggleSelectedBtn(e);
  })
);

const populateParkSelect = e => {
  parkSelect.options.length = 0;
  clearElements(parkList, countMsg);

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
  clearElements(parkList);
  parkList.classList.remove('blur', 'scrollbox');

  const selected = parkSelect.value;
  if (selected === 'default')
    return clearElements(countMsg);

  const filteringFunc = ({ state, name }) => searchType === 'location' ? state === selected : name.includes(selected);
  const selectedParks = parks.filter(filteringFunc);

  setCountMsg(selectedParks.length);

  const capitalizeAllWords = str => str && str.split(' ').map(word => word && `${word[0].toUpperCase()}${word.slice(1)}`).join(' ');
  
  for (const selectedPark of selectedParks) {
    for (const key of [ 'name', 'address', 'city', 'state' ])
      selectedPark[key] = capitalizeAllWords( selectedPark[key] );

    const { name, city, state } = selectedPark;

    const parkLi = document.createElement('li');
    parkLi.classList.add('fade-item');
    parkLi.style.display = 'none';

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

  const fadeIn = (item, delay) => setTimeout(() => {
    item.style.display = 'block';
    item.classList.add('fade');
  }, delay);

  const fadeItems = qSA(".fade-item");
  for (const [ idx, item ] of fadeItems.entries())
    fadeIn(item, idx * 30);

  setTimeout(() => parkList.classList.add('blur', 'scrollbox'), 500);
};

const setCountMsg = count => countMsg.textContent = `${count} park${count === 1 ? '' : 's'} found.`;

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
      <button id="${id}-close" class="close-btn">X</button>
    </div>
  `;
  
  parkLi.classList.add('selected-park-li');

  // rewrite onclick, otherwise clicking btn will just trigger the original parkLi.onclick again
  parkLi.onclick = null; 

  qS(`button#${id}-close`).onclick = () => {
    parkLi.innerHTML = parkLiStr;
    parkLi.classList.remove('selected-park-li');

    // w/o setTimeout, clicking the btn still triggers the onclick re-assigned below
    setTimeout(() => parkLi.onclick = () => displayParkInfo(parkLi, selectedPark, parkLiStr), 500);
  };
};
