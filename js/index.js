import { qS } from './helpers.js';

const heading = qS('#heading');
const sky = qS('#sky');
const park1 = qS('#park1');
const park2 = qS('#park2');
const mountain = qS('#mountain');

const rewriteHeading = type => heading.innerHTML = `<h4>Search ${type}?</h4>`;

sky.onmouseenter = () => heading.innerHTML = 'Outsidë';
mountain.onmouseenter = () => rewriteHeading('mountains');

park1.onmouseenter = () => parkMouseHelper(park2, 'add', 'parks');
park1.onmouseleave = () => parkMouseHelper(park2, 'remove');

park2.onmouseenter = () => parkMouseHelper(park1, 'add', 'parks');
park2.onmouseleave = () => parkMouseHelper(park1, 'remove');

const parkMouseHelper = (element, funcStr, searchType) => {
  element.classList[funcStr]('hover'); // add or remove 'hover' from classList
  if (searchType) rewriteHeading(searchType);
};
