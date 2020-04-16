import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import {handleClick, handleC} from './handleClick';
import ble from './ble';


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
        <h1>FlashBlaster</h1>
        </a>
    
        <Button variant="contained" color="primary" onClick={handleClick}>
          Log Test 
        </Button>

        <Button variant="contained" color="secondary" onClick={ble}>
          BLE Scan
        </Button>
        

      </header>
    </div>
  );
}

export default App;
