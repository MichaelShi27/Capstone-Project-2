import { mountainData } from './data/mountainData.js';
import { qS, setDisplay } from './helpers.js';

// sort alphabetically by 'name' property
const mountains = mountainData.sort((a, b) => a.name.toLowerCase().localeCompare( b.name.toLowerCase() ));

const mountainSelect = qS('#mountain-select');

window.onload = () => populateMountainSelect();

const populateMountainSelect = () => {
  mountainSelect.add( new Option('Select a mountain', 'default') );

  for (const [ idx, { name } ] of mountains.entries())
    mountainSelect.add( new Option(name, idx) );

  mountainSelect.onchange = displayMountainInfo;
};

const displayMountainInfo = () => {
  const mountainInfo = qS('#mountain-info');
  mountainInfo.innerHTML = '';

  const { value } = mountainSelect;
  if (value === 'default') return;

  const { name, elevation, effort, desc } = mountains[value];

  mountainInfo.innerHTML = `
    <div>Name: ${name}<div>
    <span>Elevation: ${elevation}<span>
    <span>Effort Level: ${effort}<span>
    <div>Description: ${desc}<div>
  `;
};
