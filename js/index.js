import { qS } from './helpers.js';

const heading = qS('#heading');
const sky = qS('#sky');
const mountain = qS('#mountain');
const park = qS('#park');

const rewriteHeading = str => heading.innerHTML = str ? `<h4>Search ${str}?</h4>` : 'Outsidë';

sky.onmouseenter = () => rewriteHeading();
mountain.onmouseenter = () => rewriteHeading('mountains');
park.onmouseenter = () => rewriteHeading('parks');

const speechBtn = qS('#speech-button');
const musicBtn = qS('#music-button');

musicBtn.onclick = () => {
  const audio = qS('audio');
  audio.style.display = (audio.style.display === 'none' || audio.style.display === '') ? 'inline' : 'none';
};
