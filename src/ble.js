
async function ble()
{ 
    let device = await navigator.bluetooth.requestDevice({
        filters: [ 
            { namePrefix: 'FLASHBLASTER' } 
        ],
    });
}

export default ble; 

