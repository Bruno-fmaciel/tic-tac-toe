function Gameboard() {
    const rows = 3;
    const columns = 3;
    const gameboard = [];

    for (let i = 0; i < rows; i++) {
        gameboard[i] = [];
        for (let j = 0; j < columns; j++) {
            gameboard[i].push(Cell());
        }
    }

    const getBoard = () => gameboard;

    const mark = (row,column,player) => {
        gameboard[row][column].addMark(player);
    }

    const printBoard = () => {
        const boardWithCellValues = gameboard.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }
    
    return {
        getBoard,
        mark,
        printBoard
    }
}

function Cell() {
    let value = "";

    const addMark = (player) => {
        if (value == "") {
            value = player;
        } else {
            return;
        }    
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    }
}

/*function Player(name) {
    return {
        name
    };
}*/

function GameController(playerOneName = "Player One",
playerTwoName = "Player Two") {
    const gameboard = Gameboard();

    const players = [
        {name : playerOneName,
        token : "X"},
        {name : playerTwoName,
        token : "O"}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => activePlayer = activePlayer.name === players[0].name ? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const checkWinner = () => {
        const board = gameboard.getBoard();

        for (let i=0;i<board.length;i++) {
            if (board[i][0].getValue() !== "" && board[i][0].getValue() === board[i][1].getValue() && board[i][0].getValue() === board[i][2].getValue()) {
                return players.find(player => player.token === board[i][0].getValue());
            };
        }

        for (let i=0;i<board[0].length;i++) {
            if (board[0][i].getValue() !== "" && board[0][i].getValue() === board[1][i].getValue() && board[0][i].getValue() === board[2][i].getValue()) {
                return players.find(player => player.token === board[0][i].getValue());
            };
        }

        if (board[0][0].getValue() !== "" && board[0][0].getValue() === board[1][1].getValue() && board[0][0].getValue() === board[2][2].getValue()) {
            return players.find(player=> player.token === board[0][0].getValue());
        }

        if (board[0][2].getValue() !== "" && board[0][2].getValue() === board[1][1].getValue() && board[0][2].getValue() === board[2][0].getValue()) {
            return players.find(player=> player.token === board[0][2].getValue());
        }

        return null;
    }

    const itsDraw = () => {
        const board = gameboard.getBoard();

        for (let i = 0; i<board.length; i++){
            for(let j=0; j<board[i].length; j++){
                if (board[i][j].getValue() === "") {
                    return false;
                }
            }
        }

        return true;
    }

    const playRound = (row,column) => {
        console.log(`Marking ${getActivePlayer().token} for ${getActivePlayer().name}, into row ${row} and column ${column}.`);
        gameboard.mark(row,column,getActivePlayer().token);

        //Place logic for cheking if there's a winner.
        const winner = checkWinner();
        if (winner) {
            console.log(`${winner.name} has won!`)
            return;
        }

        if (itsDraw()) {
            console.log("It's a draw!");
            return;
        }


        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        getBoard : gameboard.getBoard
    }
}

function ScreenController() {
    const game = GameController(); 
    const playerOneTurn = document.getElementById("PlayerOne");
    const playerTwoTurn = document.getElementById('PlayerTwo');
    const gameboardDiv = document.querySelector('.gameboard');

    const updateScreen = () => {
        gameboardDiv.textContent = "";
        const gameboard = game.getBoard();

        gameboard.forEach((row,rowIndex) => {
            row.forEach((cell,columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = cell.getValue();
                gameboardDiv.appendChild(cellButton);
            })
        })
    }

    function clickBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if (!selectedColumn || !selectedRow) return;
        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    }

    gameboardDiv.addEventListener('click', clickBoard);

    updateScreen();
}

ScreenController();
