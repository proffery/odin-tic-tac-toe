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

const Player = (playerName, playerSign) => {
    return {playerName, playerSign};
};

const game = (() => {
    function renderBoard(boardArr) {
        const allRows = document.querySelectorAll('.row')
        allRows.forEach(row => row.remove());

        const gameBoardContainer = document.querySelector('.game-board');
        
        for (let i = 0; i < boardArr.length; i++) {
            let row = document.createElement('div');
            row.id = (`row${i}`);
            row.classList.add('row');
            gameBoardContainer.appendChild(row);
            let rowI = document.getElementById(`row${i}`);
            for (let j = 0; j < boardArr[i].length; j++) {
                let column = document.createElement('div');
                column.classList.add('square');
                column.setAttribute('row', i);
                column.setAttribute('column', j);
                column.id = (`square${i}-${j}`);
                if (boardArr[i][j] === true) {
                    column.textContent = 'X';
                }
                else if (boardArr[i][j] === false) {
                    column.textContent = 'O';
                }
                else {
                    column.textContent = '';
                }
                rowI.appendChild(column);
                column.addEventListener('click', fill);
            } 
        }
        if (gameBoard.isEnd()) {
            console.log('End of game');
        }
    }

    function fill(e) {
        if (gameBoard.getBoard()[e.target.getAttribute('row')][e.target.getAttribute('column')] !== undefined) {
            console.log('Fild not empty');
        }
        else {
            gameBoard.setBoard(e.target.getAttribute('row'), e.target.getAttribute('column'), player1.playerSign);
            renderBoard(gameBoard.getBoard());
        }
    }
    return {renderBoard};
    
})();


const player1 = Player('Player1', true);
const player2 = Player('Player2', !player1.playerSign);
game.renderBoard(gameBoard.getBoard());
// console.log(gameBoard.getBoard());
// console.log(`isEnd: ${gameBoard.isEnd()}`);