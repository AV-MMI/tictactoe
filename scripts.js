const gameFlow = {
	players:{
		right: {
			name: 'Zoey',
			mark: "O",
			turn: false,
		},
		left: {
			name: 'Paul',
			mark: "X",
			turn: true,
		},
	},

	gameboard: {
		arr: [[''],[''],[''],
			  [''],[''],[''],
			  [''],[''],['']]
	},

	over: false,
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
				if(gameboardArr[i][0] !== ''){
					displaysForSquares[i].appendChild( _createDomSquare(gameboardArr[i]) );
					if(gameboardArr[i][0] !== ''){
						displaysForSquares[i].setAttribute('marked', 'true');
					}
				}
			}
		}
	};

	const _obtainPlayerWProp = (playersObj, prop, val) => {

		// return the player with the passed prop that contains the passed val
		if(val){
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

	//const _highlightPlayerTurn = (playerO, playerB) => WORKINGHERE
	// EVENT HANDLER
	const squareClicked = (event) => {
		if(event.target.classList.contains('square')){
			// obtain player with the current turn (true)
			let currentPlayer = _obtainPlayerWProp(gameFlow.players, 'turn', true);

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
					gameFlow.gameboard.arr[ event.target.id[ event.target.id.length - 1] ] = [gameFlow.players[currentPlayer].mark];

					//display mssg
					_displayMessage(mssgSpan, 'Good luck to both of you!');

					//check the board
					_checkGame(gameFlow.gameboard.arr);

					//toggle turn between players
					localFuncs.toggleTurns(gameFlow.players.right, gameFlow.players.left);

					//hightlight player with the current turn.

				}
			}
		}
	};

	const _checkGame = (gameboardArr) => {
		//horizontal
		if(gameboardArr[0][0] !== '' && gameboardArr[0][0] == gameboardArr[1][0] && gameboardArr[1][0] == gameboardArr[2][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[3][0] !== '' && gameboardArr[3][0] == gameboardArr[4][0] && gameboardArr[4][0] == gameboardArr[5][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[3][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[6][0] !== '' && gameboardArr[6][0] == gameboardArr[7][0] && gameboardArr[7][0] == gameboardArr[8][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[6][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//vertical
		else if(gameboardArr[0][0] !== '' && gameboardArr[0][0] == gameboardArr[3][0] && gameboardArr[3][0] == gameboardArr[6][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[1][0] !== '' && gameboardArr[1][0] == gameboardArr[4][0] && gameboardArr[4][0] == gameboardArr[7][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[1][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[2][0] !== '' && gameboardArr[2][0] == gameboardArr[5][0] && gameboardArr[5][0] == gameboardArr[8][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[2][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//diagonal
		else if(gameboardArr[0][0] !== '' && gameboardArr[0][0] == gameboardArr[4][0] && gameboardArr[4][0] == gameboardArr[8][0]){

			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[0][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		else if(gameboardArr[2][0] !== '' && gameboardArr[2][0] == gameboardArr[4][0] && gameboardArr[4][0] == gameboardArr[6][0]){
			//obtain winner player
			let winnerPlayer = gameFlow.players [ _obtainPlayerWProp(gameFlow.players, 'mark', gameboardArr[2][0]) ].name;
			//display mssg
			_displayMessage(mssgSpan, `${winnerPlayer} has win the game!`, 'victor-mssg');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) )
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}

		//check for tie
		else if(gameboardArr[0][0] !== '' &&
				gameboardArr[0][0] !== '' && gameboardArr[1][0] !== '' && gameboardArr[2][0] !== '' &&
				gameboardArr[3][0] !== '' && gameboardArr[4][0] !== '' && gameboardArr[5][0] !== '' &&
				gameboardArr[6][0] !== '' && gameboardArr[7][0] !== '' && gameboardArr[8][0] !== ''){
			//display mssg
			_displayMessage(mssgSpan, 'There has been a tie! :(');
			mssgSpan.parentElement.appendChild( _createBtn('reset', 'reset-btn', 'click', _resetClicked) );
			//don't allow more marks in the gameboard
			gameFlow.over = true;
		}
	}

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
	}

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
	}

	return {
		renderGameboard,
		squareClicked,
	}
})();

const localFuncs = (() => {
	const clearGameboardArr = (arr) => {
		for(let i = 0; i < arr.length; i++){
			arr[i][0] = '';
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
	}

	return {
		clearGameboardArr,
		toggleTurns,
	}
})();

const squares = document.querySelectorAll('.square');
const mssgSpan = document.getElementById('mssg-span');

//Add event listeners
squares.forEach((el) => el.addEventListener('click', DOMFuncs.squareClicked));

//Invoking funcs
DOMFuncs.renderGameboard(squares, gameFlow.gameboard.arr);