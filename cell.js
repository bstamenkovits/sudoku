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