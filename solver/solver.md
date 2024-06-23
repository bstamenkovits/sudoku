# Solver
This direcotry contains python scripts that can solve any sudoku puzzle. 

## `board.py`
contains a class to represent a Sudoku board. It keeps track of all the values in real time, and contains several checks to validate the board or a specific cell value.

## `solver.py`
contains a simple burte force solver that runs through every possible value until a valid sudoku solution is found. It takes a board object as input. 

## `main.py`
contains some code to load a game from `games.txt`, instantiate a board using the puzzle input, solves the sudoku puzzle, and verifies the solution with the known solution also found in `games.txt`

## `games.txt`
The games in games.txt are seperated by newlines. Each game (line) consists of two sets of numbers, where the sets are 81 characters long and are seperated by a comma. The first set is the sudoku puzzle, while the second set is the solution to the puzzle.