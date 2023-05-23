import { qS } from './helpers.js';

const park1 = qS('#park1');
const park2 = qS('#park2');

park1.onmouseenter = () => park2.classList.add('hover');
park2.onmouseenter = () => park1.classList.add('hover');

park1.onmouseleave = () => park2.classList.remove('hover');
park2.onmouseleave = () => park1.classList.remove('hover');
