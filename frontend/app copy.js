const puzzle = "004300209005009001070060043006002087190007400050083000600000105003508690042910300";
const board = new Board(puzzle);

const cellDivs = board.getCellDivs()
const inputDivs = getInputs();
const editModeToggle = document.getElementById("edit-mode-input");
const editMode = document.getElementById("edit-mode-input").checked;

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function getActiveCell() { return document.querySelector('.cell.active'); }
function getInputs() { return Array.from(document.getElementsByClassName("cell-input")) }


cellDivs.forEach(cellDiv => {
    cellDiv.addEventListener('click', () => {
        cellDivs.forEach(cellDiv => {
            cellDiv.classList.remove("active");
        });
        cellDiv.classList.add("active");
        board.activeCell = board.cells.find(cell => cell.div == cellDiv)

        updateInputSelection();
    });
})

inputDivs.forEach(inputDiv => {
    inputDiv.addEventListener('click', () => {
        updateInputSelection(inputDiv);
        // updateBoard();
    });
})







function validateCell(cell, value) {
    let conflictingCell = board.checkInput(cell, value)
    if (conflictingCell) {
        conflictingCell.div.classList.add("conflict");
        sleep(1500);
        conflictingCell.div.classList.remove("conflict");
        return false;
    }
    return true;
}

function updateBoard() {
    let editMode = document.getElementById("edit-mode-input").checked;
    let activeCell = board.activeCell;
    
    if (editMode && activeCell.value == "") {
        activeCell.showEditGrid();
        inputDivs.forEach(inputDiv => {
            if (inputDiv.classList.contains("active")) {
                console.log(inputDiv.textContent)
                let inputValue = inputDiv.textContent;
                activeCell.updateEditGrid(inputValue);
            }
        })
    }
    else {
        activeCell.hideEditGrid();
        inputDivs.forEach(inputDiv => {
            if (inputDiv.classList.contains("active")) {
                let inputValue = inputDiv.textContent;

                // check if chosen value is valid
                let valid = validateCell(activeCell, inputValue);
                console.log(valid)
                // update cell value
                if (valid) {
                    activeCell.updateValue(inputValue);
                }
            }
        })
    }
}



function updateInputSelection(inputDiv) {
    let editMode = document.getElementById("edit-mode-input").checked;
    let activeCell = board.activeCell;

    // if edit mode is active, update selection with values from edit grid
    if (editMode) {
        inputDiv.classList.add("active");
        activeCell.updateEditGrid(inputDiv.textContent);
        // activeCell.getEditGridActiveValues().forEach(value => {
        //     console.log(value)
        //     inputDivs.forEach(inputDiv => {
        //         inputDiv.classList.remove("active");
        //         if (inputDiv.textContent == value) {
        //             inputDiv.classList.add("active");
        //         }
        //     });
        // })
    }

    // if edit mode is NOT active, update selection with value from active cell
    else {
        inputDivs.forEach(div => {
            div.classList.remove("active");
            if (div.textContent == activeCell.value) {
                div.classList.add("active");
            }
        })

        if (inputDiv) {
            
            updateBoard();
        }
    }
}

// async function updateActiveCell(value) {
//     // find cell
//     let cellDiv = getActiveCell();
//     cell = board.cells.find(cell => cell.div == cellDiv);

//     value = (value == "🗑️") ? "" : value;

//     // check value
//     let conflictingCell = board.checkInput(cell, value)
//     if (conflictingCell) {
//         conflictingCell.div.classList.add("conflict");
//         await sleep(1500);
//         conflictingCell.div.classList.remove("conflict");
//     }
//     else {
//         // update cell value
//         cellDiv.querySelector(".cell-value").textContent = value;
//         cell.value = value;
//         cell.hideEditGrid();
//     }
    
    
// }


// function updateActiveCellInput(value) {
//     getInputs().forEach(input => {
//         input.classList.remove("active");
//         if (input.textContent == value) {
//             input.classList.add("active");
//         }
//     })
// }


// function updateEditGrid(value) {
//     let cellDiv = getActiveCell();
//     let editGrid = cellDiv.querySelector(".edit-grid");
//     let editGridCells = Array.from(editGrid.getElementsByClassName("edit-grid-cell"));

//     editGridCells.forEach(cell => {
//         if (cell.textContent == value) {
//             cell.classList.add("active");
//         }
//     })
//     console.log(editGridCells)
// }



// // update board based on selected input
// inputDivs.forEach(inputDiv => {
//     inputDiv.addEventListener('click', () => {
//         // update shown selected input
//         inputDivs.forEach(inputDiv => {
//             inputDiv.classList.remove("active");
//         });
//         inputDiv.classList.add("active");

//         // get selected value
//         let value = inputDiv.textContent;
        

//         let editMode = document.getElementById("edit-mode-input").checked;
//         if (editMode) {
//             updateEditGrid(value);
//             return;
//         }

//         // update active cell value
//         updateActiveCell(value);
//     });
// })



// // update input based on selected board cell
// cellDivs.forEach(cellDiv => {
//     cellDiv.addEventListener('click', () => {
//         cellDivs.forEach(cellDiv => {
//             cellDiv.classList.remove("active");
//         });
//         cellDiv.classList.add("active");

//         let value = cellDiv.textContent;
//         updateActiveCellInput(value);
//     });
// })


// editModeToggle.addEventListener('change', () => {
//     // board.cells.forEach(cell => {
//     //     if (cell.value != "") {
//     //         cell.hideEditGrid();
//     //     }
//     // })

//     cellDivs.forEach(cellDiv => {
//         let editGrid = cellDiv.querySelector(".edit-grid")
//         if (cellDiv.textContent.length == 9) {
//             editGrid.classList.remove("hidden");
//         }
//         else {
//             console.log("hiding")
            
//             editGrid.classList.add("hidden")
//         }
//     })
// })





