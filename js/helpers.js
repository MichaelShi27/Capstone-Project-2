const qS = document.querySelector.bind(document);
const qSA = document.querySelectorAll.bind(document);

const setDisplay = (element, value) => element.style.display = value;

const hideElements = (...elements) => elements.forEach(el => setDisplay(el, 'none'));

export { qS, qSA, setDisplay, hideElements };
