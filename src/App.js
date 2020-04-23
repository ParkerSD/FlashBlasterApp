import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import handleClick from './handleClick';
import {bleScan, callbackTx} from './ble';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import { compose, spacing, palette } from '@material-ui/system';
import ProjectField from './ProjectField.js';
import ChipField from './ChipField.js';
import React, { Component } from 'react';
import puck from './puck';


var startByte = "CC"; 

var addProjectCMD = "10";
var addChipCMD = "20";
var addFileCMD = "30";
var delProjectCMD = "40";
var delChipCMD = "50";
var delfileCMD = "60"; 

class App extends Component {

  state = {
    selectedFile: null,
    project: null,
    chip: null
  }

  fileSelectedHandler = (event) =>{
    this.setState({
      selectedFile: event.target.files[0] //target is file type, first member in files array is added file 
    })
  }

  projectNameHandler = (event) => {
    this.state.project = event.target.value;
    console.log("Project's Name:", this.state.project);
  }

  chipNameHandler = (event) => {
    this.state.chip = event.target.value;
    console.log("Chip's Name:", this.state.chip);
  }

  fileUploadHandler = () => {
    if(this.state.selectedFile !== null)
    {

      console.log(this.state.selectedFile); //stat object has other properties ex: this.state.selectedFile.name
      var file = this.state.selectedFile;
      
      var fileSize = this.state.selectedFile.size; 
      var fileNameSize = this.state.selectedFile.name.length; 
      var projectNameSize = this.state.project.length;
      var chipNameSize = this.state.chip.length;

      var fileSizeDigits = Math.floor(Math.log10(fileSize)) + 1; //decimal digits in file size value
      var fileLengthDigits = Math.floor(Math.log10(fileNameSize)) + 1;
      var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
      var chipLengthDigits = Math.floor(Math.log10(chipNameSize)) + 1;

      var fileAdd = `${startByte}${addFileCMD}${fileLengthDigits}${this.state.selectedFile.name.length}${this.state.selectedFile.name}`;
      var fileData = `${fileSizeDigits}${fileSize}`;
      var project = `${projectLengthDigits}${this.state.project.length}${this.state.project}`;
      var chip = `${chipLengthDigits}${this.state.chip.length}${this.state.chip}`;
      

      var reader = new FileReader();
      reader.onload = function () {
        puck.write(fileAdd.concat(chip, project, fileData, reader.result), callbackTx); // concatenate project, chip, and file
      }
      reader.readAsBinaryString(file); //now available in the result attribute
    }
  }

  render(){
    return (
      <div className="App">

        <input type="file" onChange={this.fileSelectedHandler}/>
        <Button variant="contained" color="secondary" onClick={this.fileUploadHandler}> 
          Transfer File 
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
        
            <Box border={5} color="darkblue" bgcolor="white"  p={10}>

            Project: 
            <input type="text" onChange={this.projectNameHandler}/>
            
            Chip: 
            <input type="text" onChange={this.chipNameHandler}/>
            
            {/* <ProjectField/>  */}
            {/* <ChipField/>  */}
            </Box>

          </header>
        </div>

    );
  }
}

export default App;
