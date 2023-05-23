const qS = document.querySelector.bind(document);
const qSA = document.querySelectorAll.bind(document);

const setDisplay = (element, value) => element.style.display = value;

const hideElements = (...elements) => elements.forEach(el => setDisplay(el, 'none'));

const createMap = async (lat, lng, element, title) => {
  const position = { lat, lng };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(element, { zoom: 4, center: position, mapId: "map",});
  const marker = new AdvancedMarkerElement({ map, position, title });
};

export { qS, qSA, setDisplay, hideElements, createMap };
