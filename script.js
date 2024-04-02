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
    let value = 0;

    const addMark = (player) => {
        if (value == 0) {
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
        token : 1},
        {name : playerTwoName,
        token : 2}
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => activePlayer = activePlayer === players[0]? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    const playRound = (row,column) => {
        console.log(`Marking ${getActivePlayer().token} for ${getActivePlayer().name}, into row ${row} and column ${column}.`);
        gameboard.mark(row,column,getActivePlayer().token);

        //Place logic for cheking if there's a winner.

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    }
}

const game = GameController();