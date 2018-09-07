// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM ELements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value')
const body = document.querySelector('body');

// Init Voice Array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //  Loop Through the voices create an option for each one
    voices.forEach(voice => {
        // Create an option element
        const option = document.createElement('option');
        // Fill options with languages
        option.textContent = voice.name + '(' + voice.lang + ')';
        
        // Set Attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    
    // Check is speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== '') {
        // Add back ground
        body.style.background = '#141414 url(../img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak End
        speakText.onend = e => {
            console.log('Done Speaking');
            body.style.background = '#141414';
        }

        // Speak Error
        speakText.onerror = e => {
            console.log('Oops! Something went wrong.');
        }

        // Selected Voice 
            // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
  

        // loop Through Voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak 
        synth.speak(speakText);
        
    }
}

// Event Listeners

// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice Select change
voiceSelect.addEventListener('change', e => speak());