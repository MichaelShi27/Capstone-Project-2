import { mountainData } from './data/mountainData.js';
import { qS } from './helpers.js';

// sort alphabetically by 'name' property
const mountains = mountainData.sort((a, b) => a.name.toLowerCase().localeCompare( b.name.toLowerCase() ));

const mountainSelect = qS('#mountains-select');

window.onload = () => populateMountainSelect();

const populateMountainSelect = () => {
  mountainSelect.add( new Option('Select a mountain', 'default') );

  for (const [ idx, { name } ] of mountains.entries())
    mountainSelect.add( new Option(name, idx) );

  mountainSelect.onchange = displayMountainInfo;
};

const displayMountainInfo = async () => {
  const mountainInfo = qS('#mountains-info');
  mountainInfo.innerHTML = '';

  const { value } = mountainSelect;
  if (value === 'default') return;

  const { name, elevation, effort, desc, img, coords: { lat, lng } } = mountains[value];
  const { results: { sunrise, sunset } } = await fetchSunriseSunset(lat, lng);

  mountainInfo.innerHTML = `
    <span class="m-3"><strong>Elevation:</strong> ${elevation}'</span>
    <span class="m-3"><strong>Effort Level:</strong> ${effort}</span>
    <span class="m-3"><strong>Sunrise:</strong> ${sunrise} UTC</span>
    <span class="m-3"><strong>Sunset:</strong> ${sunset} UTC</span>
    <div class="m-3"><strong>Description:</strong> ${desc}</div>
    <div class="p-3 img-container">
      <img class="m-2" src="../images/mountains/${img}">
      <div class="m-2" id="map"></div>
    </div>
  `;

  createMap({ lat, lng }, qS('#map'), name);
};

const createMap = async (position, element, title) => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(element, { zoom: 4, center: position, mapId: "map",});
  const marker = new AdvancedMarkerElement({ map, position, title });
};

const fetchSunriseSunset = async (lat, lng) => {
  const resp = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  return await resp.json();
};
