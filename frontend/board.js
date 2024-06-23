function createEditGrid() {
    let editGrid = document.createElement("div");
    editGrid.classList.add("edit-grid");
    // editGrid.classList.add("hidden");

    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        let editRowDiv = document.createElement("div");
        editRowDiv.classList.add("edit-grid-row");
        for (let colIdx = 0; colIdx < 3; colIdx++) {
            let editCellDiv = document.createElement("div");
            editCellDiv.classList.add("edit-grid-cell");
            // editCellDiv.classList.add("active");

            editCellDiv.textContent = 3*rowIdx + colIdx + 1;
            editRowDiv.appendChild(editCellDiv);
        }
        editGrid.appendChild(editRowDiv);
    }
    return editGrid;
}


class Cell {
    constructor(value, rowIdx, colIdx, boxIdx, boxPos, div, active=false) {
        this.value = value
        this.rowIdx = rowIdx
        this.colIdx = colIdx
        this.boxIdx = boxIdx
        this.boxPos = boxPos
        this.div = div
        this.active = active
        this.validValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    }

    hideEditGrid() {
        this.div.querySelector(".edit-grid").classList.add("hidden");
    }

    showEditGrid() {
        this.div.querySelector(".edit-grid").classList.remove("hidden");
    }

    updateValue(value) {
        value = (this.validValues.includes(value)) ? value : ""
        
        // update internal value
        this.value = value
        
        // update shown value
        this.div.querySelector(".cell-value").textContent = value
    }

    updateEditGrid(values) {
        let editGrid = this.div.querySelector(".edit-grid")
        let editCells = editGrid.querySelectorAll(".edit-grid-cell")
        editCells.forEach(editCell => {
            if (values.includes(editCell.textContent)) {
                editCell.classList.add("active")
            }
            else {
                editCell.classList.remove("active")
            }
        })
    }

    getEditGridActiveValues() {
        let editGrid = this.div.querySelector(".edit-grid")
        let editCells = editGrid.querySelectorAll(".edit-grid-cell")
        let values = []
        editCells.forEach(editCell => {
            if (editCell.classList.contains("active")) {
                values.push(editCell.textContent)
            }
        })
        return values
    }
}


class Board {
    constructor(puzzle) {
        this.puzzle = puzzle
        this.boxes = Array.from({ length: 9 }, () => Array(9).fill(null));
        this.rows = Array.from({ length: 9 }, () => Array(9).fill(null));
        this.columns = Array.from({ length: 9 }, () => Array(9).fill(null));
        this.cells = Array(81).fill(null);

        this.activeCell = null
        this.loadPuzzle();
    }

    loadPuzzle() {
        const board = document.getElementById("board");
        for (let boxIdx = 0; boxIdx < 9; boxIdx++) {
            // create box div
            const boxDiv = document.createElement("div");
            boxDiv.classList.add("box");

            for (let boxPos =0; boxPos < 9; boxPos++) {
                // create cell div
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");

                // get indices for row, column, and puzzle-string
                let rowIdx = 3*Math.floor(boxIdx/3) + Math.floor(boxPos/3)
                let colIdx = 3*(boxIdx%3) + (boxPos%3)
                let puzzleIdx = 9*rowIdx + colIdx
                
                // get value from this.puzzle
                let value = this.puzzle[puzzleIdx]
                let valueDiv = document.createElement("div");
                valueDiv.classList.add("cell-value");
                valueDiv.textContent = (value != "0") ? value : "";
                cellDiv.appendChild(valueDiv);
                
                // set cellDiv text content and create Cell object
                let editGrid = createEditGrid();
                cellDiv.appendChild(editGrid);

                if (valueDiv.textContent != "") {editGrid.classList.add("hidden")}

                let cell = new Cell(value, rowIdx, colIdx, boxIdx, boxPos, cellDiv)
                cell.updateValue(value)
                
                // track cell in sudoku board
                this.boxes[boxIdx][boxPos] = cell
                this.rows[rowIdx][colIdx] = cell
                this.columns[colIdx][rowIdx] = cell
                this.cells[puzzleIdx] = cell

                // append cellDiv to boxDiv
                boxDiv.appendChild(cellDiv);
            }

            // append boxDiv to board
            board.appendChild(boxDiv);
        }
    }

    checkInput(cell, value) {
        
        // check row
        for (let colIdx = 0; colIdx < 9; colIdx++) {
            let otherCell = this.rows[cell.rowIdx][colIdx]
            if (otherCell.value == value && cell.colIdx != colIdx) {
                return otherCell
            }
        }

        // check column
        for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
            let otherCell = this.columns[cell.colIdx][rowIdx]
            if (otherCell.value == value && cell.rowIdx != rowIdx) {
                return otherCell
            }
        }

        // check box
        for (let boxPos = 0; boxPos < 9; boxPos++) {
            let otherCell = this.boxes[cell.boxIdx][boxPos]
            if (otherCell.value == value && cell.boxPos != boxPos) {
                return otherCell
            }
        }
        return null
    
    }

    getCellDivs() {
        let cellDivs = []
        this.cells.forEach(cell => {
            cellDivs.push(cell.div)
        })
        return cellDivs
    }
}
