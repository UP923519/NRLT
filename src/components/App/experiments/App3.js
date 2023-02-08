import './App.css';
import './Dashboard.js';
import './Preferences.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Preferences from './Preferences.js';
import Dashboard from './Dashboard.js';



const displayEmojiName = event => alert(event.target.id);
const emojis = [{emoji: "😀",name: "grinning face"},{emoji: "🎉",name: "party popper"},{emoji: "💃",name: "woman dancing"}];

function App() {
  const greeting = "greeting";
  const displayAction = false;
  return(
    <div className = "container">
      <h1 id={greeting}>Carbon Tracker Web Application</h1>
      <p>Home</p>
      {displayAction && <p>I am writing JSX</p>}
      <ul>
      {
          emojis.map(emoji => (
            <li key={emoji.name}>
              <button
                onClick={displayEmojiName}
              >
                <span role="img" aria-label={emoji.name} id={emoji.name}>{emoji.emoji}</span>
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );

}

export default App;
