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
         if (playerArr[1].playerName !== 'AI') {
            if (gameBoard.isWinner()) {
                return `${playerArr[0].playerName} is WIN!`;
            }
    
            else {
                if (gameBoard.isEnd()) {
                    return 'No winners...';
                }
            }
        }
        else {

        }
    }

    function fill(e) {
        if (playerArr[1].playerName !== 'AI') {
            if (gameBoard.getBoard()[e.target.getAttribute('row')][e.target.getAttribute('column')] !== undefined) {
                console.log('Fild not empty');
            }
            else {
                gameBoard.setBoard(e.target.getAttribute('row'), e.target.getAttribute('column'), playerArr[0].playerSign);
                renderBoard(gameBoard.getBoard());
                nextPlayer();
            }
        }
        
        else {
            if (gameBoard.getBoard()[e.target.getAttribute('row')][e.target.getAttribute('column')] !== undefined) {
                console.log('Fild not empty');
            }
            else {
                gameBoard.setBoard(e.target.getAttribute('row'), e.target.getAttribute('column'), playerArr[0].playerSign);
                renderBoard(gameBoard.getBoard());
                aiMove();
                renderBoard(gameBoard.getBoard());
            }
        }
    }
    
    function aiMove() {

        for (let i = 0; i < gameBoard.getBoard().length; i++) {
            for (let j = 0; j <gameBoard.getBoard()[i].length; j++) {
                if (gameBoard.getBoard()[i][j] === undefined) {
                    gameBoard.setBoard(i, j, playerArr[1].playerSign);
                }
            } 
        }
        // if (gameBoard.getBoard()[1][1] === undefined) {
        //     gameBoard.setBoard(1, 1, playerArr[1].playerSign);
        // }
        // else if (gameBoard.getBoard()[0][0] === undefined) {
        //     gameBoard.setBoard(0, 0, playerArr[1].playerSign);
        // }
        // else if (gameBoard.getBoard()[0][2] === undefined) {
        //     gameBoard.setBoard(0, 2, playerArr[1].playerSign);
        // }
        // else if (gameBoard.getBoard()[2][2] === undefined) {
        //     gameBoard.setBoard(2, 2, playerArr[1].playerSign);
        // }
        // else if (gameBoard.getBoard()[2][0] === undefined) {
        //     gameBoard.setBoard(2, 0, playerArr[1].playerSign);
        // }
        // else {
        //     let i = Math.floor(Math.random() * 3);
        //     let j = Math.floor(Math.random() * 3);
        //     console.log(i);
        //     console.log(j);
        //     while (gameBoard.getBoard()[i][j] === undefined) {
        //         i = Math.floor(Math.random() * 3);
        //         j = Math.floor(Math.random() * 3);
        //         console.log(i);
        //         console.log(j);
        //     }

        //     gameBoard.setBoard(i, j, playerArr[1].playerSign);
        // }
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
        msgContainer.textContent = 'New game';
        startWindow.appendChild(msgContainer);
        
        let playersContainer = document.createElement('div');
        playersContainer.classList.add('all-players');
        startWindow.appendChild(playersContainer);
        
        let player1MarkContainer = document.createElement('div');
        player1MarkContainer.classList.add('player1-mark-container');
        playersContainer.appendChild(player1MarkContainer);
        let player2MarkContainer = document.createElement('div');
        player2MarkContainer.classList.add('player2-mark-container');
        playersContainer.appendChild(player2MarkContainer);

        player1MarkContainer.innerHTML = `
        <div>Player1
            <div>
                <input type="radio" name="p1" id="p1markOne">
                <label for="p1markOne">${MARK_ONE}</label>
            </div>
            <div>
                <input type="radio" name="p1" id="p1markTwo">
                <label for="p1markTwo">${MARK_TWO}</label>
            </div>
        </div>
        `;

        player2MarkContainer.innerHTML = `
        <div>Player2
            <div>
                <input type="radio" name="p2" id="p2markOne">
                <label for="p2markOne">AI</label>
                </div>
                <div>
                <input type="radio" name="p2" id="p2markTwo">
                <label for="p2markTwo">Human</label>
            </div>
        </div>
        `;

        let startButton = document.createElement('button');
        startButton.classList.add('start-button');
        startButton.textContent = 'Start';
        startWindow.appendChild(startButton);
        let allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.removeEventListener('click', fill));
        startButton.addEventListener('click', createPlayer);
        startButton.addEventListener('click', startOfGame);
    }

    function createPlayer() {
        const player1 = document.getElementById('p1markOne');
        const player2 = document.getElementById('p2markOne');
        if (player2.getAttribute('checked') === '') {
            if (player1.getAttribute('checked') === '') {
                playerArr[0] = Player('Player1', true);
                playerArr[1] = Player('Player2', !playerArr[0].playerSign);
            }
            else {
                playerArr[0] = Player('Player1', false);
                playerArr[1] = Player('Player2', !playerArr[0].playerSign);
            }
        }

        else if (player2.getAttribute('checked')) {
            if (player1.getAttribute('checked') == '') {
                playerArr[0] = Player('Player1', true);
                playerArr[1] = Player('AI', !playerArr[0].playerSign);
            }
            else if (player2.getAttribute('checked')) {
                playerArr[0] = Player('Player1', false);
                playerArr[1] = Player('AI', !playerArr[0].playerSign);
            }
        }

        console.log(playerArr);
    }

    function startOfGame() {
        renderBoard(gameBoard.getBoard());
        let startWindow = document.querySelector('.start-window');
        gameBoardContainer.removeChild(startWindow);
    }

    function endOfGame() {
        gameBoard.cleanBoard();
        playerArr.splice(0,playerArr.length);
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