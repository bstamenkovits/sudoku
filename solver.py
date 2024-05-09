from board import Board

class BruteForceSolver:
    
    def __init__(self, board:Board):
        self.board = board
        
    def solve(self) -> Board:
        # initial values
        row_idx = -1
        col_idx = -1
        solved = True
        
        # check if board is actually solved
        for i in range(9):
            for j in range(9):
                if self.board[i][j] == 0:
                    # found an empty cell at row_idx, col_idx
                    row_idx = i
                    col_idx = j
                    solved = False
                    break
            
            if not solved:
                break
                
        if solved:
            print("Solved!")
            return True
                    
        # loop over possible values for empty cell
        for value in range(1, 10):
            
            # check if value can be placed in cell
            if self.board.check_cell(row_idx, col_idx, value):
                
                # valid value, place it in cell
                self.board[row_idx][col_idx] = value
                
                correct = self.solve()
                if correct:
                    return True
                
                
            self.board[row_idx][col_idx] = 0
        
        return False
                