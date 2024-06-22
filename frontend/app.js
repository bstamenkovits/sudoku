const puzzle = "004300209005009001070060043006002087190007400050083000600000105003508690042910300";
const board = new Board(puzzle);

const cellDivs = board.getCellDivs()
const inputDivs = getInputs();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getActiveCell() {
    return document.querySelector('.cell.active');
}

function getInputs() {
    return Array.from(document.getElementsByClassName("cell-input"))
}

async function updateActiveCell(value) {
    // find cell
    let cellDiv = getActiveCell();
    cell = board.cells.find(cell => cell.div == cellDiv);

    value = (value == "🗑️") ? "" : value;

    // check value
    let conflictingCell = board.checkInput(cell, value)
    if (conflictingCell) {
        conflictingCell.div.classList.add("conflict");
        await sleep(1500);
        conflictingCell.div.classList.remove("conflict");
    }
    else {
        // update cell value
        cellDiv.textContent = value;
        cell.value = value;
    }
    
    
}


function updateActiveCellInput(value) {
    getInputs().forEach(input => {
        input.classList.remove("active");
        if (input.textContent == value) {
            input.classList.add("active");
        }
    })
}



// update board based on selected input
inputDivs.forEach(inputDiv => {
    inputDiv.addEventListener('click', () => {
        inputDivs.forEach(inputDiv => {
            inputDiv.classList.remove("active");
        });
        inputDiv.classList.add("active");

        // update active cell value
        let value = inputDiv.textContent;
        updateActiveCell(value);
    });
})



// update input based on selected board cell
cellDivs.forEach(cellDiv => {
    cellDiv.addEventListener('click', () => {
        cellDivs.forEach(cellDiv => {
            cellDiv.classList.remove("active");
        });
        cellDiv.classList.add("active");

        let value = cellDiv.textContent;
        updateActiveCellInput(value);
    });
})