import { qS } from './helpers.js';

const rewriteHeading = str => qS('#heading').innerHTML = str ? `<h4>Search ${str}?</h4>` : 'Outsidë';

qS('#sky').onmouseenter = () => rewriteHeading();
qS('#mountain').onmouseenter = () => rewriteHeading('mountains');
qS('#park').onmouseenter = () => rewriteHeading('parks');

qS('#music-button').onclick = () => {
  const audio = qS('audio');
  audio.style.display = (audio.style.display === 'none' || audio.style.display === '') ? 'inline' : 'none';
};

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const options = [
  'mountains',
  'search mountains',
  'parks',
  'search parks',
  'soap',
  'soap today',
  'movies',
  'watch movies'
];

const grammar = `#JSGF V1.0; grammar colors; public <option> = ${options.join(" | ")};`;

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar);

recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const speechMsg = qS('#speech-msg');

qS('#speech-button').onclick = () => {
  if (speechMsg.classList.contains('on')) {
    recognition.stop();
    speechMsg.innerHTML = '';
    speechMsg.classList.remove('on');
  } else {
    recognition.start();
    speechMsg.innerHTML = "Ready to receive a voice command.";
    speechMsg.classList.add('on');
  }
};

recognition.onresult = e => {
  const switchPage = str => window.location.pathname.replace('index', str);

  const speech = e.results[0][0].transcript;
  if (speech === options[0] || speech === options[1])
    window.location = switchPage('mountains');
  else if (speech === options[2] || speech === options[3])
    window.location = switchPage('parks');
  else if (
    speech === options[4] || speech === options[5] || 
    speech === options[6] || speech === options[7]
  ) window.location = 'https://soap2day.to/';
  else {
    speechMsg.innerHTML = "I didn't recognize that command.";
    recognition.stop();
    speechMsg.classList.remove('on');
    setTimeout(() => !speechMsg.classList.contains('on') && (speechMsg.innerHTML = ''), 4000);
  }
};

recognition.onspeechend = recognition.stop;
recognition.onnomatch = () => speechMsg.innerHTML = "I didn't recognize that command.";
recognition.onerror = () => speechMsg.innerHTML = 'Error occurred in speech recognition!';

qS('#ufo-cover').onclick = () => {
  qS('#ufo').style.display = 'block';
  qS('#ufo-cover').classList.add('triggered');
};
