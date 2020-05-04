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
const addFileCMD = "30";
const addAllCMD = "00";
const delProjectCMD = "40";
const delChipCMD = "50";
const delfileCMD = "60"; 
const eraseCMD ="FF"; 

class App extends Component {
  
  state = {
    selectedFile: null,
    project: null,
    chip: null,
    file: null,
    cmd: null
  }

  cmdSelectedHandler = (event) =>{
    this.state.cmd = event.target.value; 
    console.log("Command Selected:", this.state.cmd);
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

  fileNameHandler = (event) => {
    this.state.file = event.target.value;
    console.log("File's Name:", this.state.file);
  }
  

  fileUploadHandler = () => {
     
    if(this.state.cmd == addAllCMD){ 
    }

    else if(this.state.cmd == addProjectCMD){ 
      var projectNameSize = this.state.project.length;
      var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
      var project = `${startByte}${addProjectCMD}${projectLengthDigits}${this.state.project.length}${this.state.project}`;
      puck.write(project);
    }

    else if(this.state.cmd == addChipCMD){ 
      var projectNameSize = this.state.project.length;
      var chipNameSize = this.state.chip.length;
      var projectLengthDigits = Math.floor(Math.log10(projectNameSize)) + 1;
      var chipLengthDigits = Math.floor(Math.log10(chipNameSize)) + 1;
      var project = `${projectLengthDigits}${this.state.project.length}${this.state.project}`;
      var chip = `${startByte}${addChipCMD}${chipLengthDigits}${this.state.chip.length}${this.state.chip}`;
      puck.write(chip.concat(project));
    }

    else if(this.state.cmd == delProjectCMD){ 
    }

    else if(this.state.cmd == delChipCMD){ 
    }

    else if(this.state.cmd == delfileCMD){  
    }

    else if(this.state.cmd == eraseCMD){  
      var eraseDevice = `${startByte}${eraseCMD}`;
      puck.write(eraseDevice); 
    }

    else if(this.state.cmd == addFileCMD){ 
      if(this.state.selectedFile !== null){

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
        reader.onload = async function () { //is async await working here?
          const a = await puck.write(fileAdd.concat(chip, project, fileData), callbackHeaderTx); // concatenate project, chip, and file
          const b = await puck.write(reader.result, callbackTx)
        }
        reader.readAsBinaryString(file); //now available in the result attribute
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
        
          <Box border={5} color="black" bgcolor="white"  p={10}>
          {/* <FormControl variant="outlined"> */}
            <InputLabel>Select Command</InputLabel>
              <Select
                onChange={this.cmdSelectedHandler}
                // value={this.state.cmd}
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={addFileCMD}>Add File</MenuItem>
                <MenuItem value={addChipCMD}>Add Chip</MenuItem>
                <MenuItem value={addProjectCMD}>Add Project</MenuItem>
                <MenuItem value={addAllCMD}>Add All</MenuItem>
                <MenuItem value={delfileCMD}>Delete File</MenuItem>
                <MenuItem value={delChipCMD}>Delete Chip</MenuItem>
                <MenuItem value={delProjectCMD}>Delete Project</MenuItem>
                <MenuItem value={eraseCMD}>Erase Device</MenuItem>
              </Select>
            {/* </FormControl> */}
            <br />
            <br />
            
            Project: 
            <Input type="text" onChange={this.projectNameHandler}/>
            <br />
          
            Chip: 
            <Input type="text" onChange={this.chipNameHandler}/>
            <br />
            
            File: 
            <Input type="text" onChange={this.fileNameHandler}/>
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
