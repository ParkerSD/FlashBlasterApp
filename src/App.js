import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import handleClick from './handleClick';
import {bleScan, callbackTx, callbackHeaderTx} from './ble';
import { styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import { compose, spacing, palette } from '@material-ui/system';
import React, { Component } from 'react';
import puck from './puck';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';


const startByte = "CC"; 
const addProjectCMD = "10";
const addChipCMD = "20";
const addProgramCMD = "30";
const addAllCMD = "00";
const delProjectCMD = "40";
const delChipCMD = "50";
const delProgramCMD = "60"; 
const eraseCMD ="FF"; 
const minStrLen = 3; 
const maxStrLen = 15; 



class App extends Component {
  
  state = {
    selectedFile: null,
    project: null,
    chip: null,
    program: null,
    cmd: null
  }

  cmdSelectedHandler = (event) =>{
    this.state.cmd = event.target.value; 
    // this.setState({
    //   cmd: event.target.value
    // })
    console.log("Command Selected:", this.state.cmd);
  }

  fileSelectedHandler = (event) =>{
    this.setState({
      selectedFile: event.target.files[0] //target is file type, first member in files array is added file 
    })
  }

  projectNameHandler = (event) => {
    this.state.project = event.target.value;
    // this.setState({
    //   project: event.target.value
    // })
    console.log("Project's Name:", this.state.project);
  }

  chipNameHandler = (event) => {
    this.state.chip = event.target.value;
    console.log("Chip's Name:", this.state.chip);
  }

  programNameHandler = (event) => {
    this.state.program = event.target.value;
    console.log("Program's Name:", this.state.program);
  }
  dataCallback = () => {

    var file = this.state.selectedFile;
    var reader = new FileReader();
    reader.onload = function () { 
      puck.write(reader.result, callbackTx); 
    }
    reader.readAsBinaryString(file); //now available in the result attribute

  }

  writeData = (cmd) => {

    console.log(this.state.selectedFile); //stat object has other properties ex: this.state.selectedFile.name
  
    var fileSize = this.state.selectedFile.size; 
    var programNameSize = this.state.program.length; 
    var projectNameSize = this.state.project.length;
    var chipNameSize = this.state.chip.length;

    var fileSizeDigits = Math.floor(Math.log10(fileSize)) + 1; //decimal digits in file size value
    var programLengthDigits = Math.floor(Math.log10(programNameSize)) + 1;
    var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
    var chipLengthDigits = Math.floor(Math.log10(chipNameSize)) + 1;

    var startCmd = `${startByte}${cmd}${programLengthDigits}${programNameSize}${this.state.program}`;
    var fileData = `${fileSizeDigits}${fileSize}`;
    var project = `${projectLengthDigits}${projectNameSize}${this.state.project}`;
    var chip = `${chipLengthDigits}${chipNameSize}${this.state.chip}`;

    var header = startCmd.concat(chip, project, fileData);
    puck.write(header, this.dataCallback);
  }

  fileUploadHandler = () => {

    if(this.state.cmd == addAllCMD){ 
      if(this.state.selectedFile !== null && this.state.program !== null){
        if(this.state.project.length < minStrLen || this.state.chip.length < minStrLen || this.state.program.length < minStrLen
          || this.state.project.length > maxStrLen || this.state.chip.length > maxStrLen || this.state.program.length > maxStrLen) {
          console.warn("names must be 2 < length < 16");
        }
        else
        {
          this.writeData(addAllCMD);
        }
      }
    }

    else if(this.state.cmd == addProjectCMD){ 
      if(this.state.project.length < minStrLen || this.state.project.length > maxStrLen) {
        console.warn("project name must be 2 < length < 16");
      }
      else{
        var projectNameSize = this.state.project.length;
        var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
        var project = `${startByte}${addProjectCMD}${projectLengthDigits}${this.state.project.length}${this.state.project}`;
        puck.write(project);

      }
    }

    else if(this.state.cmd == addChipCMD){ 
      if(this.state.chip.length < minStrLen || this.state.chip.length > maxStrLen) {
        console.warn("chip name must be 2 < length < 16");
      }
      else{
        var projectNameSize = this.state.project.length;
        var chipNameSize = this.state.chip.length;
        var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
        var chipLengthDigits = Math.floor(Math.log10(chipNameSize)) + 1;
        var project = `${projectLengthDigits}${this.state.project.length}${this.state.project}`;
        var chip = `${startByte}${addChipCMD}${chipLengthDigits}${this.state.chip.length}${this.state.chip}`;
        puck.write(chip.concat(project));

      }
    }

    else if(this.state.cmd == delProjectCMD){ 
      if(this.state.project.length < minStrLen || this.state.project.length > maxStrLen) {
        console.warn("project name must be 2 < length < 16");
      }
      else{
            //TODO
      }
    }

    else if(this.state.cmd == delChipCMD){ 
      if(this.state.chip.length < minStrLen || this.state.chip.length > maxStrLen) {
        console.warn("chip name must be 2 < length < 16");
      }
      else{
            //TODO
      }
    }

    else if(this.state.cmd == delProgramCMD){  
      if(this.state.program.length < minStrLen || this.state.program.length > maxStrLen) {
        console.warn("file name must be 2 < length < 16");
      }
      else{
           //TODO
      }
    }

    else if(this.state.cmd == eraseCMD){  
        var eraseDevice = `${startByte}${eraseCMD}`;
        puck.write(eraseDevice); 
    }

    else if(this.state.cmd == addProgramCMD){ 
      if(this.state.selectedFile !== null && this.state.program !== null){
        if(this.state.program.length < minStrLen || this.state.program.length > maxStrLen) {
          console.warn("program name must be 2 < length < 16");
        }
        else{
          this.writeData(addProgramCMD); 
        }
      }
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h2>FlashBlaster</h2>
          <p>
            <Button variant="outlined" color="secondary" onClick={this.fileUploadHandler}> 
              Update Device 
            </Button>
 
            {/* <Button variant="contained" color="primary" onClick={bleWrite}>
              Write Data
            </Button> */}
          </p>
        
          <Box border={2} color="black" bgcolor="white"  p={10}>
          {/* <FormControl variant="outlined"> */}
            <InputLabel>Select Command</InputLabel>
              <Select
                onChange={this.cmdSelectedHandler}
                // value={this.state.cmd}
                >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={addProgramCMD}>Add Program</MenuItem>
                <MenuItem value={addChipCMD}>Add Chip</MenuItem>
                <MenuItem value={addProjectCMD}>Add Project</MenuItem>
                <MenuItem value={addAllCMD}>Add All</MenuItem>
                <MenuItem value={delProgramCMD}>Delete Program</MenuItem>
                <MenuItem value={delChipCMD}>Delete Chip</MenuItem>
                <MenuItem value={delProjectCMD}>Delete Project</MenuItem>
                <MenuItem value={eraseCMD}>Erase Device</MenuItem>
              </Select>
            {/* </FormControl> */}
            <br />
            <br />
            
             
            <Input type="text" onChange={this.projectNameHandler}/>
            <br />
            Project
            <br />
        
            <Input type="text" onChange={this.chipNameHandler}/>
            <br />
            Chip
            <br />
            
            <Input type="text" onChange={this.programNameHandler}/>
            <br />
            Program
            <br />
            <br />

            <Input
              color="white"
              // accept=".bin"
              type="file"
              onChange={this.fileSelectedHandler}
              id="icon-button-file"
            />

          </Box>
        </header>
      </div>
    );
  }
}

export default App;
