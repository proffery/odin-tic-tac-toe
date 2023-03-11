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

    function cleanBoard() {
        for (let i = 0; i < _gameFild.length; i++) {
            for (let j = 0; j < _gameFild[i].length; j++) {
                _gameFild[i][j] = undefined;
            } 
        }
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

    return {getBoard, setBoard, isEnd, cleanBoard};
})();

const Player = (playerName, playerSign) => {
    return {playerName, playerSign};
};

const game = (() => {
    const gameBoardContainer = document.querySelector('.game-board');
    function renderBoard(boardArr) {
        const allRows = document.querySelectorAll('.row')
        allRows.forEach(row => row.remove());
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
            endWindow();
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

    function startWindow() {
        renderBoard(gameBoard.getBoard());
        let startWindow = document.createElement('div');
        startWindow.classList.add('start-window');
        gameBoardContainer.appendChild(startWindow);
        let msgContainer = document.createElement('div');
        msgContainer.classList.add('msg-container');
        msgContainer.textContent = 'Start new game';
        startWindow.appendChild(msgContainer);
        let startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.textContent = 'Start';
        startWindow.appendChild(startButton);
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.removeEventListener('click', fill));
        startButton.addEventListener('click', startOfGame);
    }
    
    function startOfGame() {
        renderBoard(gameBoard.getBoard());
        let startWindow = document.querySelector('.start-window');
        gameBoardContainer.removeChild(startWindow);
    }

    function endOfGame() {
        gameBoard.cleanBoard();
        renderBoard(gameBoard.getBoard())
        let endWindow = document.querySelector('.end-window');
        gameBoardContainer.removeChild(endWindow);
        startWindow();
    }

    function endWindow() {
        let endWindow = document.createElement('div');
        endWindow.classList.add('end-window');
        gameBoardContainer.appendChild(endWindow);
        let msgContainer = document.createElement('div');
        msgContainer.classList.add('msg-container');
        msgContainer.textContent = 'The game is over';
        endWindow.appendChild(msgContainer);
        let newGameButton = document.createElement('button');
        newGameButton.classList.add('new-game-button');
        newGameButton.textContent = 'New';
        endWindow.appendChild(newGameButton);
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.removeEventListener('click', fill));
        newGameButton.addEventListener('click', endOfGame);
    }

    return {startWindow};
    
})();
const player1 = Player('Player1', true);
const player2 = Player('Player2', !player1.playerSign);
game.startWindow();
//game.renderBoard(gameBoard.getBoard());
// console.log(gameBoard.getBoard());
// console.log(`isEnd: ${gameBoard.isEnd()}`);