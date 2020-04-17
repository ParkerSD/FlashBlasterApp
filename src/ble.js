import React from 'react';
import puck from './puck';


function callback()
{
  //should this transition to new menu? where project/chip/file is selected?
  console.log('connection callback executed');
}

function callback1()
{
  console.log('data sent');
}

async function bleScan()
{ 
  puck.connect(callback);
}

async function bleWrite()
{
  puck.write("1", callback1);
}

export {bleScan, bleWrite}; 

