const cellDivs = board.getCellDivs()
const inputDivs = getInputs();
const editModeToggle = document.getElementById("edit-mode-input");
const editMode = document.getElementById("edit-mode-input").checked;

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function getActiveInput() { return document.querySelector('.cell-input.active'); }
function getActiveInputs() { return Array.from(document.getElementsByClassName("cell-input active")) }
function getInputs() { return Array.from(document.getElementsByClassName("cell-input")) }

function getActiveCell() { 
    let cellDiv = document.querySelector('.cell.active');
    return board.cells.find(cell => cell.div == cellDiv)
}

async function validateCell(cell, value) {
    let conflictingCell = board.checkInput(cell, value)
    if (conflictingCell) {
        conflictingCell.div.classList.add("conflict");
        await sleep(1500);
        conflictingCell.div.classList.remove("conflict");
        return false;
    }
    return true;
}

async function handleInputClick(inputDiv) {
    let editMode = document.getElementById("edit-mode-input").checked;
    if (editMode) {
        if (board.activeCell.value == "") {
            // add active to selected input div
            inputDiv.classList.toggle("active")

            // activate edit grid value
            let activeInputs = getActiveInputs().map(inputDiv => inputDiv.textContent);
            console.log(activeInputs);
            board.activeCell.updateEditGrid(activeInputs);
        }
        return
    }

    else { 
        let inputValue = inputDiv.textContent
        
        // update active cell value
        let valid = await validateCell(board.activeCell, inputValue);
        console.log(valid)

        // update cell value
        if (valid) {
            // update and replace active input
            inputDivs.forEach(inputDiv => { inputDiv.classList.remove("active"); })
            inputDiv.classList.add("active");       

            board.activeCell.hideEditGrid();
            board.activeCell.updateValue(inputValue);
        }
        
        if (board.activeCell.value == "") { 
            board.activeCell.showEditGrid();
            inputDivs.forEach(inputDiv => { inputDiv.classList.remove("active"); })
        }
        
    }
}


function handleCellClick(cellDiv){
    // update and replace active cell
    cellDivs.forEach(cellDiv => { cellDiv.classList.remove("active"); });
    cellDiv.classList.add("active");
    board.activeCell = getActiveCell();

    // check if in edit mode
    let editMode = document.getElementById("edit-mode-input").checked;
    if (editMode) {
        // check if in edit mode AND cell is empty
        if (board.activeCell.value == "") {
            board.activeCell.showEditGrid();

            // active values in edit grid
            let activeValues = board.activeCell.getEditGridActiveValues();

            // show active selection based on active values in edit grid
            inputDivs.forEach(inputDiv => {
                if (activeValues.includes(inputDiv.textContent)) {
                    inputDiv.classList.add("active");
                }
                else {
                    inputDiv.classList.remove("active");
                }
            })
        }

        // check if in edit mode AND cell is filled
        else {
            // remove active from all input divs
            inputDivs.forEach(inputDiv => {
                inputDiv.classList.remove("active")
            });
        }
    }
}


function handleEditModeToggle() {
    let editMode = document.getElementById("edit-mode-input").checked;
    if (editMode) {

    }
    else {
        inputDivs.forEach(inputDiv => {
            inputDiv.classList.remove("active")
        })
    }
}


inputDivs.forEach(inputDiv => {
    inputDiv.addEventListener('click', () => {
        handleInputClick(inputDiv);
    })
})

cellDivs.forEach(cellDiv => {
    cellDiv.addEventListener('click', () => {
        handleCellClick(cellDiv)
    })
})

editModeToggle.addEventListener('change', () => {
    handleEditModeToggle();
})
