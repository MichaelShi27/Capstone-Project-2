import { parkTypes } from './data/parkTypeData.js';
import { parkData } from './data/nationalParkData.js';
import { locations } from './data/locationData.js';

import { qS, qSA, setDisplay, hideElements } from './helpers.js';

const parkSelect = qS('#parks-select');

window.onload = () => {
  hideElements(parkSelect);
  qSA('button').forEach(btn => btn.onclick = populateParkSelect);
};

const populateParkSelect = e => {
  const options = e.target.textContent === 'Location' ? locations : parkTypes;
  
  setDisplay(parkSelect, 'block');
  parkSelect.add( new Option('Select an option', 'default') );

  for (const option of options)
    parkSelect.add( new Option(option, option) );
};
