import React from 'react';
import puck from './puck';



function callbackConn()
{
  //should this transition to new menu? where project/chip/file is selected?
  console.log('Connection Established');
}

function callbackHeaderTx()
{
  console.log('Header Sent');
}

function callbackTx()
{
  console.log('Data Transfer Complete');
}

async function bleScan()
{ 
  puck.connect(callbackConn);
}

async function bleWrite() //test write
{ 
  puck.write("12345", callbackTx); 
}


export {bleScan, bleWrite, callbackTx, callbackHeaderTx}; 

