import { mountainData } from './data/mountainData.js';
import { qS, setDisplay, hideElements } from './helpers.js';

const mountainSelect = qS('#mountains-select');
const mountainSort = qS('#mountains-sort');
const mountainInfo = qS('#mountains-info');
const mtnImg = qS('#mtn-img');

const sortMountainData = () => {
  const { value } = mountainSort;
  const effortLevels = { Moderate: 1, 'Moderate to Strenous': 2, Strenuous: 3 };
  const sortByName = (a, b) => a.name.toLowerCase().localeCompare( b.name.toLowerCase() );

  return mountainData.sort((a, b) => {
    if (value === 'a-z')
      return sortByName(a, b);
    else if (value === 'elevation')
      return (a.elevation - b.elevation) || sortByName(a, b);
    else if (value === 'effort')
      return (effortLevels[a.effort] - effortLevels[b.effort]) || sortByName(a, b);
  });
};

const populateMountainSelect = () => {
  mountainSelect.options.length = 0;
  hideElements(mountainInfo);
  setDisplay(mtnImg, 'block');

  const mountains = sortMountainData();

  mountainSelect.add( new Option('Select a mountain', 'default') );

  for (const [ idx, { name } ] of mountains.entries())
    mountainSelect.add( new Option(name, idx) );

  mountainSelect.onchange = () => displayMountainInfo(mountains);
};

window.onload = populateMountainSelect;
mountainSort.onchange = populateMountainSelect;

const displayMountainInfo = async mountains => {
  hideElements(mountainInfo);

  const { value } = mountainSelect;
  if (value === 'default')
    return setDisplay(mtnImg, 'block');

  setDisplay(mountainInfo, 'block');

  const { name, elevation, effort, desc, img, coords: { lat, lng } } = mountains[value];
  const { results: { sunrise, sunset } } = await fetchSunriseSunset(lat, lng);

  mountainInfo.innerHTML = `
    <span class="mtn-info mtn-info-border"><strong>Elevation:</strong> ${elevation}'</span>
    <span class="mtn-info"><strong>Effort Level:</strong> ${effort}</span>
    <span class="mtn-info"><strong>Sunrise:</strong> ${sunrise} UTC</span>
    <span class="mtn-info"><strong>Sunset:</strong> ${sunset} UTC</span>
    <div class="mtn-info mtn-info-border"><strong>Description:</strong> ${desc}</div>
    <div class="p-3 img-container fade-in-fast">
      <img class="m-2" src="../images/mountains/${img}" alt="${name}">
      <div class="m-2" id="map"></div>
      <div class="m-2" id="street-view"></div>
    </div>
  `;

  createMap({ lat, lng }, qS('#map'), name);
};

const createMap = async (position, element, title) => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(element, { zoom: 4, center: position, mapId: "map",});
  const marker = new AdvancedMarkerElement({ map, position, title });
  const streetView = new google.maps.StreetViewPanorama(
    qS('#street-view'),
    { position, pov: { heading: 165, pitch: 0 }, zoom: 1 }
  );  
};

const fetchSunriseSunset = async (lat, lng) => {
  const resp = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
  return await resp.json();
};
