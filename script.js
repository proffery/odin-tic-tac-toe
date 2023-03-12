const MARK_ONE = 'X';
const MARK_TWO = 'O';
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
    
    function isWinner() {
        if ((_gameFild[0][0] == _gameFild[0][1]) && (_gameFild[0][1] == _gameFild[0][2]) && (_gameFild[0][0] != undefined)) {
            return true;
        }

        else if ((_gameFild[1][0] == _gameFild[1][1]) && (_gameFild[1][1] == _gameFild[1][2]) && (_gameFild[1][0] != undefined)) {
            return true;
        }

        else if ((_gameFild[2][0] == _gameFild[2][1]) && (_gameFild[2][1] == _gameFild[2][2]) && (_gameFild[2][0] != undefined)) {
            return true;
        }

        else if ((_gameFild[0][0] == _gameFild[1][0]) && (_gameFild[1][0] == _gameFild[2][0]) && (_gameFild[0][0] != undefined)) {
            return true;
        }

        else if ((_gameFild[0][1] == _gameFild[1][1]) && (_gameFild[1][1] == _gameFild[2][1]) && (_gameFild[0][1] != undefined)) {
            return true;
        }

        else if ((_gameFild[0][2] == _gameFild[1][2]) && (_gameFild[1][2] == _gameFild[2][2]) && (_gameFild[0][2] != undefined)) {
            return true;
        }

        else if ((_gameFild[0][0] == _gameFild[1][1]) && (_gameFild[1][1] == _gameFild[2][2]) && (_gameFild[0][0] != undefined)) {
            return true;
        }

        else if ((_gameFild[0][2] == _gameFild[1][1]) && (_gameFild[1][1] == _gameFild[2][0]) && (_gameFild[0][2] != undefined)) {
            return true;
        }

        else {
            return false;
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
    
    return {getBoard, setBoard, isEnd, cleanBoard, isWinner};
})();

const Player = (playerName, playerSign) => {
    return {playerName, playerSign};
};

const game = (() => {
    const playerArr = [];
    const gameBoardContainer = document.querySelector('.game-board');
    const playerMsg = document.createElement('div');
    
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
                let square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('row', i);
                square.setAttribute('column', j);
                square.id = (`square${i}-${j}`);
                if (boardArr[i][j] === true) {
                    square.textContent = MARK_ONE;
                }
                else if (boardArr[i][j] === false) {
                    square.textContent = MARK_TWO;
                }
                else {
                    square.textContent = '';
                }
                rowI.appendChild(square);
                square.addEventListener('click', fill);
            } 
        }
        if (gameBoard.isEnd() || gameBoard.isWinner()) {
            playerMsg.remove();
            endWindow();
        }
    }
    
    function winnerControl() {
        if (gameBoard.isWinner()) {
            return `${playerArr[0].playerName} is WIN!`;
        }

        else {
            if (gameBoard.isEnd()) {
                return 'No winners...';
            }
        }
    }

    function fill(e) {
        if (gameBoard.getBoard()[e.target.getAttribute('row')][e.target.getAttribute('column')] !== undefined) {
            console.log('Fild not empty');
        }
        else {
            gameBoard.setBoard(e.target.getAttribute('row'), e.target.getAttribute('column'), playerArr[0].playerSign);
            console.log(`isEnd:${gameBoard.isEnd()}`);
            console.log(`isWinner:${gameBoard.isWinner()}`);
            renderBoard(gameBoard.getBoard());
            nextPlayer();
        }
    }
    
    
    
    function nextPlayer() {
        if (!gameBoard.isEnd() && !gameBoard.isWinner()) {
            playerMsg.classList.add('player-msg');
            playerMsg.textContent = `${playerArr[1].playerName} your move:`;
            gameBoardContainer.appendChild(playerMsg);
            let temp = playerArr[0];
            playerArr[0] = playerArr[1];
            playerArr[1] = temp;
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
        let playerMarkContainer = document.createElement('div');
        playerMarkContainer.classList.add('player-mark-container');
        playerMarkContainer.textContent = 'Player1'
        startWindow.appendChild(playerMarkContainer);
        let markOne = document.createElement('div');
        markOne.classList.add('mark-one');
        markOne.textContent = MARK_ONE;
        markOne.setAttribute('tabindex', '0');
        playerMarkContainer.appendChild(markOne);
        let markTwo = document.createElement('div');
        markTwo.classList.add('mark-two');
        markTwo.textContent = MARK_TWO;
        markTwo.setAttribute('tabindex', '1');
        playerMarkContainer.appendChild(markTwo);
        let startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.textContent = 'Start';
        startWindow.appendChild(startButton);
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.removeEventListener('click', fill));
        markOne.focus();
        createPlayer();
        markOne.addEventListener('click', createPlayer);
        markTwo.addEventListener('click', createPlayer);
        startButton.addEventListener('click', startOfGame);
    }

    function createPlayer() {
        const element = document.querySelector('.mark-one')
        if (element === document.activeElement) {
            playerArr[0] = Player('Player1', true);
            playerArr[1] = Player('Player2', !playerArr[0].playerSign);
        }
        else {
            playerArr[0] = Player('Player1', false);
            playerArr[1] = Player('Player2', !playerArr[0].playerSign);
        }
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
        playerMsg.remove();
        startWindow();
    }

    function endWindow() {
        let endWindow = document.createElement('div');
        endWindow.classList.add('end-window');
        gameBoardContainer.appendChild(endWindow);
        let msgContainer = document.createElement('div');
        msgContainer.classList.add('msg-container');
        msgContainer.textContent = winnerControl();
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

game.startWindow();
//game.renderBoard(gameBoard.getBoard());
// console.log(gameBoard.getBoard());
// console.log(`isEnd: ${gameBoard.isEnd()}`);