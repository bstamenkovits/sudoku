const puzzle = "004300209005009001070060043006002087190007400050083000600000105003508690042910300";
const solution = "864371259325849761971265843436192587198657432257483916689734125713528694542916378";
const board = document.getElementById("board");


function puzzleIdx(box, pos) {
    let row = 3*Math.floor(box/3) + Math.floor(pos/3)
    let col = 3*(box%3) + (pos%3)
    return 9*row + col
}

function puzzleValue(box, pos) {
    return puzzle[puzzleIdx(box, pos)]
}


for (let i = 0; i < 9; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        
        let value = puzzleValue(i, j);
        if (value != "0") {
            cell.textContent = puzzleValue(i, j);
        }
        

        cell.setAttribute('box', i);
        cell.setAttribute('pos', j);
        box.appendChild(cell);
    }
    board.appendChild(box);
}





