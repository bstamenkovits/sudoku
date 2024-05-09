import random as rnd

from board import Board
from solver import BruteForceSolver


def get_game(game_idx: int = None) -> dict:
    """
    A function that returns a sudoku game from the games.txt file.
    
    if game_idx is provided, it returns the game at the index, otherwise a
    random game is returned. The returned game is a dictionary with the puzzle 
    and solution. 
    
    Args:
        game_idx: The index of the game in the games.txt file.
    
    Returns:
        game: A dictionary with the keys 'puzzle' and 'solution'.
    """
    with open("games.txt", "r") as file:
        game_data = file.read().splitlines()
        game_str = game_data[game_idx] if game_idx is not None else rnd.choice(game_data)
        puzzle, solution = game_str.split(',')
        game = {'puzzle': puzzle, 'solution': solution}
        return game
    

if __name__ == "__main__":    
    # puzzle_str = '004371259325849761971260843436192587198657432257483916689734125713528694542916378'
    # puzzle = Board(input=puzzle_str)
    
    # load data
    game = get_game(0)
    puzzle = Board(input=game['puzzle'])
    solution = Board(input=game['solution'])
    
    # solve puzzle
    solver = BruteForceSolver(board=puzzle)
    solver.solve()
    
    solved_board = solver.board
    print(f"Correct Solution: {solved_board == solution}")