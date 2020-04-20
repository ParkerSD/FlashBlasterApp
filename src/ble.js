import React from 'react';
import puck from './puck';



function callbackConn()
{
  //should this transition to new menu? where project/chip/file is selected?
  console.log('Connection Established');
}

function callbackTx()
{
  console.log('Data Transfer Complete');
}

async function bleScan()
{ 
  puck.connect(callbackConn);
}

async function bleWrite()
{ 
  puck.write("12345", callbackTx); //test write
}

export {bleScan, bleWrite, callbackTx}; 

