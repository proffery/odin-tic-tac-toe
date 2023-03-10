const gameBoard = (() => {
    const _gameFild = new Array(3);
    for (let i = 0; i < _gameFild.length; i++) {
        _gameFild[i] = new Array(_gameFild.length);
    }

    function setValue(rowNum, columnNum, value) {
        _gameFild[rowNum][columnNum] = value;
    }

    function getValue() {
        return _gameFild;
    }


    // for (let i = 0; i < gameFild.length; i++) {
    //     for (let j = 0; j < gameFild[i].length; j++) {
    //         gameFild[i][j] = false;
    //     } 
    // }
    return {getValue, setValue};
})();

gameBoard.setValue(1, 0, false);
console.log(gameBoard.getValue());