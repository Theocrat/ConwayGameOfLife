var btnDict = {};

function Button(row, col) {
    let button = {
        'row': row,
        'col': col,
        'alive': false
    };

    return button;
}

function btnclick(row, col) {
    let btn_id = `cell_${row}_${col}`;
    let show_box = document.getElementById('living_cells');
    //console.log(btnDict[btn_id]);

    if(btnDict[btn_id].alive) {
        btnDict[btn_id].alive = false;
        document.getElementById(btn_id).className = 'dead_cell';
        show_box.innerHTML = `${parseInt( show_box.innerHTML ) - 1}`;
    }
    else {
        btnDict[btn_id].alive = true;
        document.getElementById(btn_id).className = 'living_cell';
        show_box.innerHTML = `${parseInt( show_box.innerHTML ) + 1}`;
    }
}

function neighbourhood(row, col) {
    let neighbours = [];
    let btn_id = `cell_${row}_${col}`;
    //console.log('Running neighbourhood: ', btn_id);


    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(i === 0 && j === 0)
                continue;
            
            else if(btnDict[btn_id].row + i < 0 || btnDict[btn_id].row + i >= Controller.rmax)
                continue;
            
            else if(btnDict[btn_id].col + j < 0 || btnDict[btn_id].col + j >= Controller.cmax)
                continue;
            
            else {
                let new_id = `cell_${row + i}_${col + j}`;
                neighbours.push( btnDict[new_id] );
            }
        }
    }

    return neighbours;
}

function living_neighbours(row, col) {
    let neighbours = neighbourhood(row, col);
    let living_count = 0;
    
    neighbours.forEach( (cell) => {
        if(cell.alive)
            living_count += 1;
    });

    return living_count;
}