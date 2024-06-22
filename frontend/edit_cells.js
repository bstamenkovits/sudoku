// function getCell(box, pos) {
//     return document.querySelector(`.cell[box="${box}"][pos="${pos}"]`);
// }

// function editCell(box, pos, value) {
//     const cell = getCell(box, pos);
//     cell.textContent = value;
// }

function getCells() {
    return Array.from(document.getElementsByClassName("cell"))
}

function getInputs() {
    return Array.from(document.getElementsByClassName("cell-input"))
}

function getActiveCell() {
    return document.querySelector('.cell.active');
}

function updateActiveCellInput(value) {
    let inputs = getInputs();
    inputs.forEach(input => {
        input.classList.remove("active");
        if (input.textContent == value) {
            input.classList.add("active");
        }
    })
}

function updateActiveCell(value){
    let cell = getActiveCell();
    value = (value == "🗑️") ? "" : value;
    cell.textContent = value;
}


const cells = getCells();
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.classList.remove("active");
        });
        cell.classList.add("active");

        let value = cell.textContent;
        updateActiveCellInput(value);
    });
})


const inputs = getInputs();
inputs.forEach(input => {
    input.addEventListener('click', () => {
        inputs.forEach(input => {
            input.classList.remove("active");
        });
        input.classList.add("active");
        let value = input.textContent;
        updateActiveCell(value);
    });
})