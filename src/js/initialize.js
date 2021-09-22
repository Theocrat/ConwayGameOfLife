function initialize() {
    let gamespace = document.getElementById('gamespace');
    let cell_collection = [];

    Controller.step_time = -1;
    Controller.step_count = 0;
    Controller.paused = true;
    
    for(let r = 0; r < Controller.rmax; r++) {
        let cell_row = [];
        for(let c = 0; c < Controller.cmax; c++) {
            cell_row.push(`<td> <button id="cell_${r}_${c}" class="dead_cell" onclick="btnclick(${r},${c})"></button> </td>`);
            btnDict[`cell_${r}_${c}`] = Button(r, c);
        }

        let cell_row_html = `<tr>\n${cell_row.join('\n')}\n</tr>`
        cell_collection.push(cell_row_html);
    }

    gamespace.innerHTML = cell_collection.join('\n\n');

    document.getElementById('steps_so_far').innerHTML = '0';
    document.getElementById('living_cells').innerHTML = '0';
}