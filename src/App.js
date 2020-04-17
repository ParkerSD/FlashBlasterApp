import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {handleClick, handleC} from './handleClick';
import {bleScan, bleWrite} from './ble';
import puck from './puck'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        <h2>FlashBlaster</h2>
        </a>
    
        <Button variant="contained" color="secondary" onClick={bleScan}>
          BLE Scan
        </Button>

        <Button variant="contained" color="primary" onClick={bleWrite}>
          Write Data
        </Button>


        

      </header>
    </div>
  );
}

export default App;
