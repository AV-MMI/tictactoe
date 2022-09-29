const gameFlow = {
	players:{
		right: {
			name: 'Zoey',
			mark: "O",
			turn: true,
		},
		left: {
			name: 'Paul',
			mark: "X",
			turn: false,
		},
	},

	gameboard: {
		arr: [["X"],["O"],["O"],
			  ["O"],["X"],["O"],
			  ["O"],["O"],["X"]]
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
				displaysForSquares[i].appendChild( _createDomSquare(gameboardArr[i]) );
			}
		}
	};

	return {
		renderGameboard,
	}
})();

const squares = document.querySelectorAll('.square');

//invoking funcs
DOMFuncs.renderGameboard(squares, gameFlow.gameboard.arr);