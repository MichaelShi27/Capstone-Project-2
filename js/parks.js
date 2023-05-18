import { parkTypes } from './data/parkTypeData.js';
import { parks } from './data/nationalParkData.js';
import { locations } from './data/locationData.js';

import { qS, qSA, setDisplay, hideElements } from './helpers.js';

const parkSelect = qS('#parks-select');
parkSelect.size = 10;

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

  for (const { name } of selectedParks) {
    const parkLi = document.createElement('li');
    parkLi.textContent = name;
    parkList.appendChild(parkLi);
    // parkLi.onclick = () => displayParkInfo(parkLi);
  }
};

// const displayParkInfo = parkLi => {
//   console.log('yo')
//   parkLi.innerHTML = '<h1>hi</h1>';
// };
