import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import handleClick from './handleClick';
import {bleScan, bleWrite} from './ble';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import ProjectField from './ProjectField.js';
import ChipField from './ChipField.js';
import React, { Component } from 'react';


const Box = styled('div')(compose(spacing, palette));

class App extends Component {

  state = {
    selectedFile: null
  }

  fileSelectedHandler = event =>{
    this.setState({
      selectedFile: event.target.files[0] //target is file type, first memeber in files array is added file 
    })
  }

  fileUploadHandler = () => {
    console.log(this.state.selectedFile) //stat object has other properties ex: this.state.selectedFile.name
  }

  render(){
    return (
      <div className="App">

        <input type="file" onChange={this.fileSelectedHandler}/>
        <Button variant="contained" color="secondary" onClick={this.fileUploadHandler}> 
          Upload 
        </Button>

        <header className="App-header">

          <h2>FlashBlaster</h2>

          <p>
            <Button variant="contained" color="primary" onClick={bleScan}>
              BLE Scan
            </Button>
              
            {/* <Button variant="contained" color="primary" onClick={bleWrite}>
              Write Data
            </Button> */}
          </p>
        
            <Box color="black" bgcolor="white" p={10}>
              <ProjectField/> 
              <ChipField/> 
            </Box>

          </header>
        </div>

    );
  }
}

export default App;
