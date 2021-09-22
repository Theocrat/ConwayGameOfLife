const Controller = {
    'rmax': 20,
    'cmax': 40,
    'paused': true,
    'step_time': -1,
    'step_count': 0,

    // Methods

    'step': () => {
        if(Controller.paused == false && Controller.step_time > 0) 
            setTimeout(Controller.step, Controller.step_time);
        
        let flip_set = [];
        
        for(let row = 0; row < Controller.rmax; row++) {
            for(let col = 0; col < Controller.cmax; col++) {
                id = `cell_${row}_${col}`;
                cell = btnDict[id];
                if(cell == null)
                    continue;
                else {
                    let living_count = living_neighbours(cell.row, cell.col);
                    if(living_count < 2 && cell.alive)
                        flip_set.push(cell);
                    if(living_count > 3 && cell.alive)
                        flip_set.push(cell);
                    if(living_count == 3 && !cell.alive)
                        flip_set.push(cell);
                }
            }
        }

        Controller.step_count += 1;
        document.getElementById('steps_so_far').innerHTML = `${Controller.step_count}`;

        let old_config = JSON.parse( JSON.stringify(btnDict) );
        flip_set.forEach( (cell) => { btnclick(cell.row, cell.col) } );
        if( JSON.stringify(old_config) == JSON.stringify(btnDict) )
            Controller.paused = true;
    },

    'beginSim': () => {
        Controller.step_time = parseInt( document.getElementById('step_time').value );
        Controller.paused = false;

        Controller.step();
    }
};