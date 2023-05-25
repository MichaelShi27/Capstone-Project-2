import { qS } from './helpers.js';

const heading = qS('#heading');
const sky = qS('#sky');
const mountain = qS('#mountain');
const park = qS('#park');

const rewriteHeading = str => heading.innerHTML = str ? `<h4>Search ${str}?</h4>` : 'Outsidë';

sky.onmouseenter = () => rewriteHeading('Outsidë');
mountain.onmouseenter = () => rewriteHeading('mountains');
park.onmouseenter = () => rewriteHeading('parks');
