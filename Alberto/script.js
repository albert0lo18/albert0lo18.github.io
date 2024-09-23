const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let currentPlayer = 1;
let player1Wins = 0;
let player2Wins = 0;
let draws = 0;

function updateBoard() {
    const cells = document.querySelectorAll('#board td');
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        cell.textContent = board[row][col] === 0 ? '' : board[row][col] === 1 ? 'X' : 'O';
    });
}

function checkWinner() {
    // Check rows, columns and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) return board[i][0];
        if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) return board[0][i];
    }
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
    return 0;
}

function makeMove(row, col) {
    if (board[row][col] !== 0) return; // Cell already taken

    board[row][col] = currentPlayer;
    updateBoard();

    const winner = checkWinner();
    if (winner !== 0) {
        document.getElementById('status').textContent = `Player ${winner} wins!`;
        if (winner === 1) player1Wins++;
        if (winner === 2) player2Wins++;
        resetGame();
        return;
    }

    if (board.flat().every(cell => cell !== 0)) {
        document.getElementById('status').textContent = "It's a draw!";
        draws++;
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function resetGame() {
    board.forEach(row => row.fill(0));
    updateBoard();
    document.getElementById('status').textContent = '';
    document.getElementById('player1Wins').textContent = player1Wins;
    document.getElementById('player2Wins').textContent = player2Wins;
    document.getElementById('draws').textContent = draws;
}
