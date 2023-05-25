import { qS } from './helpers.js';

const rewriteHeading = str => qS('#heading').innerHTML = str ? `<h4>Search ${str}?</h4>` : 'Outsidë';

qS('#sky').onmouseenter = () => rewriteHeading();
qS('#mountain').onmouseenter = () => rewriteHeading('mountains');
qS('#park').onmouseenter = () => rewriteHeading('parks');

qS('#music-button').onclick = () => {
  const audio = qS('audio');
  audio.style.display = (audio.style.display === 'none' || audio.style.display === '') ? 'inline' : 'none';
};
