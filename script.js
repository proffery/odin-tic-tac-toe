const gameBoard = (() => {
    const _gameFild = new Array(3);
    for (let i = 0; i < _gameFild.length; i++) {
        _gameFild[i] = new Array(_gameFild.length);
    }

    function setBoard(rowNum, columnNum, value) {
        _gameFild[rowNum][columnNum] = value;
    }

    function getBoard() {
        return _gameFild;
    }

    function isEnd() {
        for (let i = 0; i < _gameFild.length; i++) {
            for (let j = 0; j < _gameFild[i].length; j++) {
                if (_gameFild[i][j] === undefined)
                return false;
            } 
        }
        return true;
    }

    return {getBoard, setBoard, isEnd};
})();

const player = (playerName, playerSign) => {
    return {playerName, playerSign};
};

const game = ((gameBoard, sign) => {
    const player1 = player('Player1', sign);
    const player2 = player('Player2', !sign);
    while (!gameBoard.isEnd()) {
        
    }

});



// gameBoard.setBoard(0, 0, player1.playerSign);
// gameBoard.setBoard(0, 1, player2.playerSign);
// gameBoard.setBoard(0, 2, player1.playerSign);
// gameBoard.setBoard(1, 0, player2.playerSign);
// gameBoard.setBoard(1, 1, player1.playerSign);
// gameBoard.setBoard(1, 2, player2.playerSign);
// gameBoard.setBoard(2, 0, player1.playerSign);
// gameBoard.setBoard(2, 1, player2.playerSign);
// gameBoard.setBoard(2, 2, player1.playerSign);

// console.log(gameBoard.getBoard());
// console.log(`isEnd: ${gameBoard.isEnd()}`);