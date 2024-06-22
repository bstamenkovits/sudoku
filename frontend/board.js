class Cell {
    constructor(value, rowIdx, colIdx, boxIdx, boxPos, div, active=false) {
        this.value = value
        this.rowIdx = rowIdx
        this.colIdx = colIdx
        this.boxIdx = boxIdx
        this.boxPos = boxPos
        this.div = div
        this.active = active
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
                
                // set cellDiv text content and create Cell object
                cellDiv.textContent = (value != "0") ? value : "";
                cellDiv.setAttribute('id', `(${rowIdx},${colIdx})`);
                let cell = new Cell(value, rowIdx, colIdx, boxIdx, boxPos, cellDiv)
                
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
        console.log(this.rows)
        console.log(this.columns)
        console.log(cell)
        // check row
        for (let colIdx = 0; colIdx < 9; colIdx++) {
            let otherCell = this.rows[cell.rowIdx][colIdx]
            console.log(otherCell.div)
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
