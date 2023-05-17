const qS = document.querySelector.bind(document);

const setDisplay = (element, value) => element.style.display = value;

const hideElements = (...elements) => elements.forEach(el => setDisplay(el, 'none'));

export { qS, setDisplay, hideElements };