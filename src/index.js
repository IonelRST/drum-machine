import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'

const firstSoundsGroup = [
  {
    keyCode: 81,
    key: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    key: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    key: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    key: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    key: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    key: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    key: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    key: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    key: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {
const handleKeydown = (e) => {
  if(keyCode === e.keyCode) {
    const audio = document.getElementById(key);
    play(key, id);
    deactivateAudio(audio)
  }
}

React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
}, [])

return (
  <button value="test" id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
    <audio className="clip" src={url} id={key} />
    {key}
  </button>
);
}

const Keyboard = ({ sounds, play, deactivateAudio }) =>  (
<div className="pad-bank">
  {sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
       
  }
</div>
);

const App = () => {
const [soundName, setSoundName] = React.useState("");

const styleActiveKey = (key) => {
  key.parentElement.style.backgroundColor = "#000000"
  key.parentElement.style.color = "#ffffff"
}


const deactivateAudio = (audio) => {
 setTimeout(() => {
   audio.parentElement.style.backgroundColor = "#ffffff"
   audio.parentElement.style.color = "#000000"
 }, 300)
}

const play = (key, sound) => {
  setSoundName(sound)
  const audio = document.getElementById(key);
  styleActiveKey(audio);
  audio.currentTime = 0;
  audio.play();
  deactivateAudio(audio)
}

return (
  <div id="drum-machine" className="inner-container">
    <div className="wrapper">
      <h1 id="display">{soundName}</h1>
      <Keyboard sounds={firstSoundsGroup} play={play} deactivateAudio={deactivateAudio} />
    </div>
  </div>
)
};

ReactDOM.render(<App />, document.getElementById("root"))