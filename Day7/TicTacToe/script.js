"use strict"
var Player = (name) => {
    var isRobot = false;
    
    function getName() {
        return name;
    }

    return { getName, isRobot: isRobot};
}

var GameFlow = (function (){
    var _isPlaying = false;
    var _gameMode;
    var _crossPlayer = Player('Cross');
    var _noughtPlayer = Player('Nought');
    var _currentPlayer;

    function updateGame(position) {
        if (_isPlaying) {
            if (GameBoard.updateBoard(position, _currentPlayer)) {
                let win = GameBoard.isWin(position);
                
                if (win) { 
                    _isPlaying = false;
                    DisplayController.greetWinner(win, _currentPlayer);
                    DisplayController.updateLabel(_currentPlayer.getName() + ' has won, congratulations!');
                } else if (GameBoard.getEmpty() == 0) { 
                    _isPlaying = false;
                    DisplayController.updateGrid(position, _currentPlayer);
                    DisplayController.updateLabel('Tie!');
                } else { 
                    DisplayController.updateGrid(position, _currentPlayer);
                    _currentPlayer = _currentPlayer == _crossPlayer ? _noughtPlayer : _crossPlayer;
                    DisplayController.updateLabel(_currentPlayer.getName() + ', now is your turn.');
                    if (_currentPlayer.isRobot) { 
                        updateGame(minimax(randomInt(0, 9), 0, true));
                    }
                }
            }
        }
    }

    function startGame() {
        GameBoard.resetBoard()
        DisplayController.clearGrid();

        _isPlaying = true;
        _gameMode = DisplayController.getMode();

        if (_gameMode == 'COMPUTER_MODE') { 
            let choice = DisplayController.getChoice();

            if (choice == 'crossChoice') {
                _crossPlayer.isRobot = false;
                _noughtPlayer.isRobot = true;
            } else {
                _noughtPlayer.isRobot = false;
                _crossPlayer.isRobot = true;
            }
        } else {
            _crossPlayer.isRobot = false;
            _noughtPlayer.isRobot = false;
        }
        
        _currentPlayer = _crossPlayer; 
        DisplayController.updateLabel(_currentPlayer.getName() + ', now is your turn.');

        if (_currentPlayer.isRobot) { 
            updateGame(randomInt(0, 9)); 
        }
    }

    function minimax(position, depth, isMaximizer){
        if (GameBoard.isWin(position)) { 
            return depth == 0 ? pos : [(!isMaximizer ? 1 : -1), depth];
        } else if (GameBoard.getEmpty() == 0) { 
            return [0, depth];
        }

        let bestResult; 
        let bestPosition = -1;

        if (isMaximizer) {
            bestResult = [-2, 0]; 
            for (let i = 0; i < 9; i++) { 
                if (GameBoard.updateBoard(i, _currentPlayer)) {
                    let result = minimax(i, depth + 1, false);
                    GameBoard.removePosition(i);

                    if (result[0] > bestResult[0] || (result[0] == bestResult[0] && result[1] < bestResult[1])) {
                        bestResult = result;
                        bestPosition = i;
                    }
                }
            }
        } else {
            bestResult = [2, 0];

            for (let i = 0; i < 9; i++) {
                if (GameBoard.updateBoard(i, (_currentPlayer == _crossPlayer ? _noughtPlayer : _crossPlayer))) {
                    let result = minimax(i, depth + 1, true);
                    GameBoard.removePosition(i);

                    if (result[0] < bestResult[0] || (result[0] == bestResult[0] && result[1] < bestResult[1])) {
                        bestResult = result;
                    }
                }
            }            
        }

        return depth == 0 ? bestPosition : bestResult;
    }

    function randomInt(min, max) {
        return min + Math.floor(Math.random() * max);
    }


    return {
        updateGame,
        startGame,
    }

})();

 var GameBoard = (function () {
    var _availPositions = 9;

    var _board = new Array(9);
    resetBoard();

    function getEmpty() {
        return _availPositions;
    }

    function updateBoard(position, player) {
        let success = true;
        if (_board[position] != null) {
            success = false;
        } else {
            _board[position] = player;
            _availPositions--;
        }

        return success;
    }

    function resetBoard() {
        _board.fill(null);
        _availPositions = 9;
    }

    function removePosition(position) {
        _board[position] = null;
        _availPositions++;
    }

    function isWin(position) {
        let result = false;

        if (getEmpty() < 5)  {
            let positions = [];
    
            let row = Math.floor(position / 3) * 3;
            let column = position % 3;
    
            if (_board[row] != null && 
                _board[row] == _board[row + 1] && 
                _board[row + 1] == _board[row + 2]) { 

                positions.push(row);
                positions.push(row + 1);
                positions.push(row + 2);

            } else if (_board[column] != null & 
                       _board[column] == _board[3 + column] &&
                       _board[3 + column] == _board[6 + column]) { 

                positions.push(column);
                positions.push(3 + column);
                positions.push(6 + column);

            } else if (_board[0] != null && 
                       _board[0] == _board[4] && 
                       _board[4] == _board[8]) {

                positions.push(0);
                positions.push(4);
                positions.push(8);
                
            } else if (_board[2] != null &&
                       _board[2] == _board[4] && 
                       _board[4] == _board[6]) { 

                positions.push(2);
                positions.push(4);
                positions.push(6);
            }
            
            if (positions.length == 3) {
                result = positions;
            }
        } 

        return result;
    }

    return { 
        updateBoard,
        resetBoard, 
        isWin,
        getEmpty,
        removePosition
    };
})();

var DisplayController = (function (){
    const _elGrid = Array.from(document.getElementsByClassName('square'));
    _elGrid.forEach(square => square.addEventListener('click', GameFlow.updateGame.bind(event, square.id)));    

    const _elControlsContainer = document.getElementById('controls');
    const _elStartBtn = document.getElementById('startBtn');
    _elStartBtn.addEventListener('click', GameFlow.startGame);

    const _elChoiceContainer = document.getElementById('playerChoiceContainer');
    _elChoiceContainer.remove();

    const _elChoice = document.getElementsByName('playerChoice');

    const _elMode = document.getElementById('gameMode');
    _elMode.addEventListener('change', () => { 
        if (_elControlsContainer.children.length == 3) {
            _elControlsContainer.insertBefore(_elChoiceContainer, _elMode) 
        } else {
            _elControlsContainer.removeChild(_elChoiceContainer);
        }
    });

    const _elStatusLabel = document.getElementById('statusLabel');

    function updateGrid(position, player) {
        let sprite = document.createElement('img');
        sprite.src = './images/' + player.getName().toLowerCase() + '.png';

        _elGrid[position].appendChild(sprite);
    }

    function updateLabel(message) {
        _elStatusLabel.children[0].textContent = '';
        _elStatusLabel.lastChild.textContent = '';

        if (message.length > 0) {
            if (message.startsWith('Cross')) {
                _elStatusLabel.children[0].textContent = 'Cross';

                if (message.endsWith('congratulations!')) {
                    _elStatusLabel.children[0].style.color = '#3BD04C';
                } else {
                    _elStatusLabel.children[0].style.color = '#F8443E';
                }

                message = message.slice('Cross'.length);
            } else if(message.startsWith('Nought')){
                _elStatusLabel.children[0].textContent = 'Nought';

                if (message.endsWith('congratulations!')) {
                    _elStatusLabel.children[0].style.color = '#3BD04C';
                } else {
                    _elStatusLabel.children[0].style.color = '#0784EE';
                }

                message = message.slice('Nought'.length);
            }
        }

        _elStatusLabel.lastChild.textContent = message;
    }

    function clearGrid() {
        _elGrid.forEach(square => {
            if (square.firstChild != null) {
                square.firstChild.remove();
            }
        });
    }

    function greetWinner(positions, player) {
        let sprite = document.createElement('img');
        sprite.src = './images/' + player.getName().toLowerCase() + '_win.png';

        if (_elGrid[positions[0]].firstChild != null) {
            _elGrid[positions[0]].firstChild.remove();
        }
        _elGrid[positions[0]].appendChild(sprite.cloneNode(true));

        if (_elGrid[positions[1]].firstChild != null) {
            _elGrid[positions[1]].firstChild.remove();
        }
        _elGrid[positions[1]].appendChild(sprite.cloneNode(true));

        if (_elGrid[positions[2]].firstChild != null) {
            _elGrid[positions[2]].firstChild.remove();
        }
        _elGrid[positions[2]].appendChild(sprite.cloneNode(true));
    }

    function getChoice() {
        return _elChoice[0].checked ? _elChoice[0].id : _elChoice[1].id;
    }

    function getMode() {
        return _elMode.value;
    }


    return {
        updateGrid,
        updateLabel,
        clearGrid,
        greetWinner,
        getChoice,
        getMode,
    }
})();