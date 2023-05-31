# Capstone-Project-2: Outsidë Lands

Outsidë Lands is a website that displays various national parks and mountains, as well as information about them. It features voice command navigation, Google Maps integration, and animations.

## Screenshots

Home page:
![Home page](./images/screenshots/index.PNG)

Mountains page:
![Mountains page](./images/screenshots/mountains.PNG)

Parks page:
![Parks page](./images/screenshots/parks.PNG)

## Snippet
One interesting bit of JavaScript I wrote was for how I implemented buttons to close an individual park's information display element. Because the button is located inside the park's ```<li>``` element (i.e. parkLi), clicking on the button would originally just trigger the parkLi's onclick function. 

To solve this, I reassigned the parkLi's onclick to null inside the parkLi's onclick itself, then reset it to its original value inside the button's onclick. I needed to reset it in a setTimeout because without the setTimeout, clicking the button would still trigger the original parkLi onclick even though I only reassigned the original inside the button's onclick.

Here is the code, abridged and modified for clarity:
```
const qS = document.querySelector.bind(document);

parkLi.onclick = () => displayParkInfo(parkLi, selectedPark, parkLiStr);

const displayParkInfo = (parkLi, selectedPark, parkLiStr) => {
  // rewrite onclick, otherwise clicking the btn will just trigger the original parkLi.onclick again
  parkLi.onclick = null; 

  qS(`button#${id}-close`).onclick = () => {
    // w/o setTimeout, clicking the btn still triggers the onclick re-assigned below
    setTimeout(() => parkLi.onclick = () => displayParkInfo(parkLi, selectedPark, parkLiStr), 500);
  };
};
```