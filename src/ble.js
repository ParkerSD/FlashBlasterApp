import React from 'react';
import puck from './puck';



function callbackConn()
{
  //should this transition to new menu? where project/chip/file is selected?
  console.log('connection callback executed');
}

function callbackTx()
{
  console.log('data sent');
}

async function bleScan()
{ 
  puck.connect(callbackConn);
}

async function bleWrite()
{
  puck.write("12345", callbackTx);
}

export {bleScan, bleWrite, callbackTx}; 

