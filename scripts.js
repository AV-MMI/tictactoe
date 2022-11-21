const gameFlow = {
	players:{
		left: {
			name: 'Paul',
			mark: "X",
			turn: true,
			aiTurned: true,
		},
		right: {
			name: 'Zoey',
			mark: "O",
			turn: false,
			aiTurned: false,
		},
	},

	gameboard: {
		arr: ['X','X','O',
			  'O','','',
			  '','','O']
	},

	over: false,

	ai: {
		difficulty: '',
		active: false,
	},
}

const DOMFuncs = (() => {
	const _createDomSquare = (val) => {
		let span = document.createElement('span');

		//assign a class to the span in base to which player belongs the mark.
		if(val == gameFlow.players.right.mark){
			span.classList.add('right-player-mark');
		} else {
			span.classList.add('left-player-mark');
		}

		span.classList.add('player-mark');
		span.textContent = val;

		return span;
	};

	const renderGameboard = (displaysForSquares, gameboardArr) => {
		for(let i = 0; i < gameboardArr.length; i++){
			// make sure that our display is valid.
			if(displaysForSquares[i].classList.contains('square')){
				//make sure that our gameboardArr item is valid: not empty.
				if(gameboardArr[i] !== ''){
					displaysForSquares[i].appendChild( _createDomSquare(gameboardArr[i]) );
					if(gameboardArr[i] !== ''){
						displaysForSquares[i].setAttribute('marked', 'true');
					}
				}
			}
		}
	};

	const _displayMessage = (display, mssg, statusClass) => {
		//remove all classes but mssg-span class
		display.classList.remove('alert-mssg');
		display.classList.remove('victor-mssg');

		//if statusClass is passed add such class to the display
		if(statusClass){
			display.classList.add(statusClass);
		}

		display.textContent = mssg;
	};

	const _markSquare = (display, mark) => {
		display.appendChild( _createDomSquare(mark) );
		display.setAttribute('marked', 'true');
	};

	const highlightPlayerTurn = (playerL, playerR) => {
		if(!gameFlow.over){
			if(gameFlow.players.left.turn){
				playerL.classList.add('current-turn');
				playerR.classList.remove('current-turn');
			} else {
				playerR.classList.add('current-turn');
				playerL.classList.remove('current-turn');
			}
		}
	};

	// EVENT HANDLER
	const squareClicked = (event) => {
		if(event.target.classList.contains('square')){
			// obtain player with the current turn (true)
			let currentPlayer = localFuncs.obtainPlayerWProp(gameFlow.players, 'turn', true);

			// check if the game is not over
			if(!gameFlow.over){
				// check if the clicked square is marked
				if(event.target.hasAttribute('marked')){
					// if it turns out to be marked, display a message for the player.
					_displayMessage(mssgSpan, 'That square is already marked. Try other square!', 'alert-mssg');
				} else {
					//mark square and set attribute marked
					_markSquare(event.target, gameFlow.players[currentPlayer].mark);

					//mark corresponding arr item
					gameFlow.gameboard.arr[ event.target.id[ event.target.id.length - 1] ] = gameFlow.players[currentPlayer].mark;

					//display mssg
					_displayMessage(mssgSpan, 'Good luck to both of you!');

					//check the board
					_checkGame(gameFlow.gameboard.arr);

					//toggle turn between players
					localFuncs.toggleTurns(gameFlow.players.right, gameFlow.players.left);

					//highlight player with the current turn
					highlightPlayerTurn(leftPlayer, rightPlayer);

					// if AI is active, it will make its move
					if(gameFlow.ai.active){
						// AI makes its move
															//ai player  					//difficulty						//n 										//unmarked squares arr
						executeAIMove(localFuncs.obtainPlayerWProp(gameFlow.players, 'aiTurned', true), gameFlow.ai.difficulty);
					}
				}
			}
		}
	};

	const _checkGame = (gameboardArr) => {
		console.log(gameboardArr)
		//horizontal
		if(gameboardArr[0] !== '' && gameboardArr[0] == gameboardArr[1] && gameboardArr[1] == gameboardArr[2]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[3] !== '' && gameboardArr[3] == gameboardArr[4] && gameboardArr[4] == gameboardArr[5]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[3]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[6] !== '' && gameboardArr[6] == gameboardArr[7] && gameboardArr[7] == gameboardArr[8]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[6]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//vertical
		else if(gameboardArr[0] !== '' && gameboardArr[0] == gameboardArr[3] && gameboardArr[3] == gameboardArr[6]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[1] !== '' && gameboardArr[1] == gameboardArr[4] && gameboardArr[4] == gameboardArr[7]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[1]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[2] !== '' && gameboardArr[2] == gameboardArr[5] && gameboardArr[5] == gameboardArr[8]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[2]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//diagonal
		else if(gameboardArr[0] !== '' && gameboardArr[0] == gameboardArr[4] && gameboardArr[4] == gameboardArr[8]){

			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[2] !== '' && gameboardArr[2] == gameboardArr[4] && gameboardArr[4] == gameboardArr[6]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ localFuncs.obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[2]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			// if the game hasnt finalized 'formally' display the reset btn
			if(!gameFlow.over){
				mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			}
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//check for tie
		else if(gameboardArr[0] !== '' && gameboardArr[1] !== '' && gameboardArr[2] !== '' &&
				gameboardArr[3] !== '' && gameboardArr[4] !== '' && gameboardArr[5] !== '' &&
				gameboardArr[6] !== '' && gameboardArr[7] !== '' && gameboardArr[8] !== ''){
			console.log('tie')
			//display mssg
			_displayMessage(mssgSpan, 'There has been a tie! :(');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) );
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}
	};

	const _createBtn = (text, classes, event, handler) => {
		let button = document.createElement('button');
		button.setAttribute('type', 'button');
		button.classList.add('btn');
		button.textContent = text;
		button.addEventListener(event, handler);

		//in case an array with classes is passed
		if(Array.isArray(classes)){
			classes.forEach((sClass) => { button.classList.add(sClass) });
		} else {
			button.classList.add(classes);
		}

		return button;
	};

	const _clearDOMBoard = (nodelist) => {
		for(let i = 0; i < nodelist.length; i++){
			if(nodelist[i].classList.contains('square')){
				if(nodelist[i].hasAttribute('marked')){
					//remove span display
					nodelist[i].children[0].remove();

					//remove marked attribute
					nodelist[i].removeAttribute('marked');
				}
			}
		}
	};

	// EVENT HANDLER
	const _resetClicked = (event) => {
		//clear DOM gameboard
		_clearDOMBoard(squares);

		//clear gameboard obj
		localFuncs.clearGameboardArr(gameFlow.gameboard.arr);

		//set gameFlow.over to false
		gameFlow.over = false;

		//display default mssg
		_displayMessage(mssgSpan, 'To start the game just click a square and start playing!');

		//remove reset-btn
		event.target.remove();
	};

	// EVENT HANDLER
	const AIBtnClicked = (event) => {
		AIMenu.classList.toggle('ai-menu-open');
	};

	const AIOptClicked = (event) => {
		// remove opt-selected class from other siblings
		AIOpts.forEach((opt) => {opt.classList.remove('ai-opt-selected')});

		// selected opt
		event.target.classList.add('ai-opt-selected');

		// set ai.difficulty and ai.active
		let regex = /\w+(?=-)/g;
		let selectedOpt = event.target.id.match(regex);
		gameFlow.ai.difficulty = selectedOpt;
		gameFlow.ai.active = true;

		// doormant player turned to AI
		if(gameFlow.players.left.turn){
			gameFlow.players.left.aiTurned = false;
			gameFlow.players.right.aiTurned = true;
		} else {
			gameFlow.players.right.aiTurned = false;
			gameFlow.players.left.aiTurned = true;
		}

		// close ai menu
		AIBtnClicked();
	};

	const obtainUnmarkedSquares = (squares) => {
		let newArr = [];
		for(let i = 0; i < squares.length; i++){
			if(squares[i].classList.contains('square')){
				if(!squares[i].hasAttribute('marked')){
					newArr.push(squares[i]);
				}
			}
		}

		return newArr;
	};


	const executeAIMove = (aiPlayer, difficulty) => {
		if(gameFlow.players[aiPlayer].aiTurned && gameFlow.ai.active){
			let squaresArr = obtainUnmarkedSquares(squares);

			//easy
			if(difficulty[0] == 'easy'){
				let n = localFuncs.randomNumber(0, obtainUnmarkedSquares.length);

				// make random move
				_markSquare(squaresArr[n], gameFlow.players[aiPlayer].mark);

				//mark corresponding arr item
				gameFlow.gameboard.arr[squaresArr[n].id[ squaresArr[n].id.length - 1 ]] = gameFlow.players[aiPlayer].mark;


				// toggle turns
				localFuncs.toggleTurns(gameFlow.players.left, gameFlow.players.right);

				// check if it was a winning move
				_checkGame(gameFlow.gameboard.arr);

				//highlight player with the current turn
				highlightPlayerTurn(leftPlayer, rightPlayer);
			}

			//impossible
			else if(difficulty[0] == 'impossible'){
				localFuncs.minimax(gameFlow.gameboard.arr, gameFlow.players[aiPlayer].mark);
				let n = localFuncs.bestMove(false);
				console.log(n) // working Here

				// make best move
				if(squares[n].classList.contains(''))
				_markSquare(squares[n], gameFlow.players[aiPlayer].mark);

				//mark corresponding arr item
				gameFlow.gameboard.arr[squares[n].id[ squares[n].id.length - 1 ]] = gameFlow.players[aiPlayer].mark;

				// toggle turns
				localFuncs.toggleTurns(gameFlow.players.left, gameFlow.players.right);

				// check if it was a winning move
				_checkGame(gameFlow.gameboard.arr);

				//highlight player with the current turn
				highlightPlayerTurn(leftPlayer, rightPlayer);
			}
		}
	};

	return {
		renderGameboard,
		highlightPlayerTurn,
		squareClicked,
		AIBtnClicked,
		AIOptClicked,
		obtainUnmarkedSquares,
	}
})();

const localFuncs = (() => {
	const clearGameboardArr = (arr) => {
		for(let i = 0; i < arr.length; i++){
			arr[i] = '';
		}
	};

	const toggleTurns = (playerOObj, playerSObj) => {
		if(playerOObj && playerSObj){
			if(playerOObj.turn == true){
				playerSObj.turn = true;
				playerOObj.turn = false;
			} else {
				playerSObj.turn = false;
				playerOObj.turn = true;
			}
		}
	};

	const randomNumber = (start, limit) => {
		return Math.floor( start + ( Math.random() * limit ));
	};

	const obtainPlayerWProp = (playersObj, prop, val) => {
		// return the player with the passed prop that contains the passed val
		if(val !== undefined){
			for(player in playersObj){
				if(playersObj[player][prop] == val){
					return player;
				}
			}
		}

		// return the player with the passed prop that contains a value different than
		// undefined
		else{
			for(player in playersObj){
				if(playersObj[player][prop] !== undefined){
					return player;
				}
			}
		}
	};

	const _obtainUnmarkedSquaresIdx = (arr) => {
		let emptySquares = [];

		for(let i = 0; i < arr.length; i++){
			if(arr[i] == ''){
				emptySquares.push(i);
			}
		}

		return emptySquares;
	};

	const winningBoard = (arr, currMark) => {
		if(arr[0] == arr[1] && arr[1] == arr[2] && arr[0] == currMark ||
		   arr[3] == arr[4] && arr[4] == arr[5] && arr[3] == currMark ||
		   arr[6] == arr[7] && arr[7] == arr[8] && arr[6] == currMark ||
		   arr[0] == arr[4] && arr[4] == arr[8] && arr[0] == currMark ||
		   arr[2] == arr[4] && arr[4] == arr[6] && arr[2] == currMark ||
		   arr[0] == arr[3] && arr[3] == arr[6] && arr[0] == currMark ||
		   arr[1] == arr[4] && arr[4] == arr[7] && arr[1] == currMark ||
		   arr[2] == arr[5] && arr[5] == arr[8] && arr[2] == currMark){
			return true;
		} else {
			return false;
		}
	};

	let _globalTests = [];

	const bestMove = (max) => {
		let idx;
		let bestScore;
		let test;
		let bestTest;
		if(max){
			bestScore = -Infinity;
			for(let i = 0; i < _globalTests.length; i++){
				if(_globalTests[i].result > bestScore){
					bestScore = _globalTests[i].score;
					idx = i;
				}
			}
		} else {
			bestScore = Infinity;
			for(let i = 0; i < _globalTests.length; i++){
				if(_globalTests[i].result < bestScore){
					bestScore = _globalTests[i].score;
					idx = i;
				}
			}
		}

		bestTest = _globalTests[idx];
		_globalTests = [];

		return bestTest.idx;
	};

	const _counter = 0;

	const minimax = (currBoard, mark) => {
		let maxPlayer = obtainPlayerWProp(gameFlow.players, 'aiTurned', true);
		let minPlayer = obtainPlayerWProp(gameFlow.players, 'aiTurned', false);
		let unmarkedSquares = _obtainUnmarkedSquaresIdx(currBoard);

		// check for terminal cond
		if(winningBoard(currBoard, gameFlow.players[maxPlayer].mark)){
			return (1 * (unmarkedSquares.length + 1));
		}
		else if(winningBoard(currBoard, gameFlow.players[minPlayer].mark)){
			return (-1 * (unmarkedSquares.length + 1));
		}
		else if(unmarkedSquares.length == 0){
			return 0;
		}


		for(let i = 0; i < unmarkedSquares.length; i++){
			let newTest = {};
			newTest.board = currBoard.slice();

			newTest.idx = unmarkedSquares[i];
			newTest.board[ unmarkedSquares[i] ] = mark;

			if(mark == 'X'){
				newTest.result = minimax(newTest.board, 'O');
			} else {
				newTest.result = minimax(newTest.board, 'X');
			}

			_globalTests.push(newTest);
		}
	}

	return {
		clearGameboardArr,
		toggleTurns,
		randomNumber,
		obtainPlayerWProp,
		_globalTests,
		bestMove,
		winningBoard,
		minimax,
	}
})();

const leftPlayer = document.getElementById('left-player');
const rightPlayer = document.getElementById('right-player');
const squares = document.querySelectorAll('.square');
const mssgSpan = document.getElementById('mssg-span');

const AIBtn = document.getElementById('ai-btn');
const AIMenu = document.getElementById('ai-menu');
const AIOpts = document.querySelectorAll('.ai-opt');

//Add event listeners
squares.forEach((el) => el.addEventListener('click', DOMFuncs.squareClicked));
AIBtn.addEventListener('click', DOMFuncs.AIBtnClicked);
AIOpts.forEach((opt) => {opt.addEventListener('click', DOMFuncs.AIOptClicked)})

//Invoking funcs
DOMFuncs.renderGameboard(squares, gameFlow.gameboard.arr);
DOMFuncs.highlightPlayerTurn(leftPlayer, rightPlayer);
const aiP = localFuncs.obtainPlayerWProp(gameFlow.players, 'aiTurned', true);

localFuncs.minimax(gameFlow.gameboard.arr, 'X');