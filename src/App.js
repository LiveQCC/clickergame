import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import FightButton from './components/FightButton.js';
import FightButtonRight from './components/FightButtonRight.js';
const socket = new WebSocket('ws://localhost:8080');

function App() {
  const [countLeft, setCountLeft] = useState(0);
  const [countRight, setCountRight] = useState(0);

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCountLeft(data.countL);
      setCountRight(data.countR);
      console.log('Message from server', data);
    };
  }, []);

  const getBackgroundColor = () => {
    if (countRight > countLeft) {
      return 'black';
    } else if (countLeft > countRight) {
      return 'blue';
    }
    return 'red'; // Default background color
  };
  return (
    <div className="App" style={{ backgroundColor: getBackgroundColor() }}>
  
      <header className="App-header"  style={{ backgroundColor: getBackgroundColor() }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <div>
            <FightButtonRight side="right" count={countRight} setCount={setCountRight} />
          </div>
        </p>
        <div>
          <FightButton side="left" count={countLeft} setCount={setCountLeft} />
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
