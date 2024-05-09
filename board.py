from copy import deepcopy

class Board:
    """
    A class to represent a sudoku board.
    """
    
    def __init__(self, input: str):
        self.matrix = self.load_matrix(input)

    def __getitem__(self, index):
        return self.matrix[index]
    
    def __eq__(self, other):
        return self.matrix == other.matrix

    def load_matrix(self, input: str) -> list:
        """
        A function that loads a sudoku board from a string.
        
        Args:
            board: A string representing a sudoku board.
        
        Returns:
            board: A 2D list representing the sudoku board.
        """
        board = []
        for row_idx in range(9):
            row = []
            for col_idx in range(9):
                number = int(input[col_idx+row_idx*9])
                row.append(number)
            board.append(row)
            
        return board
    
    def check_cell(self, cell_row_idx:int, cell_col_idx:int, value:int) -> bool:
        """
        A function that checks if a value can be placed in a cell.
        
        The following sudoku rules are checked:
            - does the value already exist in the row
            - does the value already exist in the column
            - does the value already exist in the 3x3 block
            
        Args:
            cell_row_idx: The row index of the cell.
            cell_col_idx: The column index of the cell.
            value: The value to be placed in the cell.
            
        Returns:
            bool: True if the value can be placed in the cell, False otherwise.
            
        """
        grid = deepcopy(self.matrix)
        grid[cell_row_idx][cell_col_idx] = 0
        
        # check if value present in row
        for row_idx in range(9):
            if grid[row_idx][cell_col_idx] == value:
                return False
        
        # check if value present in column
        for col_idx in range(9):
            if grid[cell_row_idx][col_idx] == value:
                return False
        
        # find start coordinates of block cell is located in
        block_start_row_idx = cell_row_idx - cell_row_idx % 3
        block_start_col_idx = cell_col_idx - cell_col_idx % 3
        
        # check if value presnt in block
        for row_idx in range(3):
            for col_idx in range(3):
                r = row_idx + block_start_row_idx
                c = col_idx + block_start_col_idx
                if self.matrix[r][c] == value:
                    return False
        
        return True
    
    def board_full(self) -> bool:
        """
        A function that checks if the board is full.
        """
        for row in self.matrix:
            for cell in row:
                if cell == 0:
                    return False
        return True
        
    def check_board(self) -> bool:
        """
        A function that checks if the board is filled in correctly.
        
        The board does not have to be filled entirely, this function checks if 
        all of the currently filled cells are correct. Cells that are empty (
        have a value of 0) will not cause the check to return False.
        
        Returns:
            bool: True if the board is filled in correctly, False otherwise.
        """
        for row_idx in range(9):
            for col_idx in range(9):
                value = self.matrix[row_idx][col_idx]
                if not self.check_cell(row_idx, col_idx, value):
                    self.check_cell(row_idx, col_idx, value)
                    return False
        return True
        