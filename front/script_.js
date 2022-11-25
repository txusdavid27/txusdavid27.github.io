/*
	PROYECTO ANÁLISIS DE ALGORITMOS.
*/
var tablero = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

var H = -1;
var PC = +1;

/* Heuristica para el estado. */
function evaluar(estado) {
	var puntaje = 0;
	if (finDeJuego(estado, PC)) {
		puntaje = +1;
	}
	else if (finDeJuego(estado, H)) {
		puntaje = -1;
	} else {
		puntaje = 0;
	}
	return puntaje;
}

/* Todas las posibles rectas para ganar */
function finDeJuego(state, player) {
	var win_state = [
		[state[0][0], state[0][1], state[0][2], state[0][3] ],[state[0][1], state[0][2], state[0][3], state[0][4]], [state[0][2], state[0][3], state[0][4], state[0][5]], [state[0][3], state[0][4], state[0][5], state[0][6]],
		[state[1][0], state[1][1], state[1][2], state[1][3] ],[state[1][1], state[1][2], state[1][3], state[1][4]], [state[1][2], state[1][3], state[1][4], state[1][5]], [state[1][3], state[1][4], state[1][5], state[1][6]],
		[state[2][0], state[2][1], state[2][2], state[2][3] ],[state[2][1], state[2][2], state[2][3], state[2][4]], [state[2][2], state[2][3], state[2][4], state[2][5]], [state[2][3], state[2][4], state[2][5], state[2][6]],
		[state[3][0], state[3][1], state[3][2], state[3][3] ],[state[3][1], state[3][2], state[3][3], state[3][4]], [state[3][2], state[3][3], state[3][4], state[3][5]], [state[3][3], state[3][4], state[3][5], state[3][6]],
		[state[4][0], state[4][1], state[4][2], state[4][3] ],[state[4][1], state[4][2], state[4][3], state[4][4]], [state[4][2], state[4][3], state[4][4], state[4][5]], [state[4][3], state[4][4], state[4][5], state[4][6]],
		[state[5][0], state[5][1], state[5][2], state[5][3] ],[state[5][1], state[5][2], state[5][3], state[5][4]], [state[5][2], state[5][3], state[5][4], state[5][5]], [state[5][3], state[5][4], state[5][5], state[5][6]],
		[state[6][0], state[6][1], state[6][2], state[6][3] ],[state[6][1], state[6][2], state[6][3], state[6][4]], [state[6][2], state[6][3], state[6][4], state[6][5]], [state[6][3], state[6][4], state[6][5], state[6][6]],

		[state[0][0], state[1][0], state[2][0], state[3][0] ],[state[1][0], state[2][0], state[3][0], state[4][0]], [state[2][0], state[3][0], state[4][0], state[5][0]], [state[3][0], state[4][0], state[5][0], state[6][0]],
		[state[0][1], state[1][1], state[2][1], state[3][1] ],[state[1][1], state[2][1], state[3][1], state[4][1]], [state[2][1], state[3][1], state[4][1], state[5][1]], [state[3][1], state[4][1], state[5][1], state[6][1]],
		[state[0][2], state[1][2], state[2][2], state[3][2] ],[state[1][2], state[2][2], state[3][2], state[4][2]], [state[2][2], state[3][2], state[4][2], state[5][2]], [state[3][2], state[4][2], state[5][2], state[6][2]],
		[state[0][3], state[1][3], state[2][3], state[3][3] ],[state[1][3], state[2][3], state[3][3], state[4][3]], [state[2][3], state[3][3], state[4][3], state[5][3]], [state[3][3], state[4][3], state[5][3], state[6][3]],
		[state[0][4], state[1][4], state[2][4], state[3][4] ],[state[1][4], state[2][4], state[3][4], state[4][4]], [state[2][4], state[3][4], state[4][4], state[5][4]], [state[3][4], state[4][4], state[5][4], state[6][4]],
		[state[0][5], state[1][5], state[2][5], state[3][5] ],[state[1][5], state[2][5], state[3][5], state[4][5]], [state[2][5], state[3][5], state[4][5], state[5][5]], [state[3][5], state[4][5], state[5][5], state[6][5]],
		[state[0][6], state[1][6], state[2][6], state[3][6] ],[state[1][6], state[2][6], state[3][6], state[4][6]], [state[2][6], state[3][6], state[4][6], state[5][6]], [state[3][6], state[4][6], state[5][6], state[6][6]],

		
		
		[state[0][0], state[1][1], state[2][2], state[3][3] ],[state[1][0], state[2][1], state[3][2], state[4][3] ],[state[2][0], state[3][1], state[4][2], state[5][3] ],[state[3][0], state[4][1], state[5][2], state[6][3] ],
		[state[0][1], state[1][2], state[2][3], state[3][4] ],[state[1][1], state[2][2], state[3][3], state[4][4] ],[state[2][1], state[3][2], state[4][3], state[5][4] ],[state[3][1], state[4][2], state[5][3], state[6][4] ],
		[state[0][2], state[1][3], state[2][4], state[3][5] ],[state[1][2], state[2][3], state[3][4], state[4][5] ],[state[2][2], state[3][3], state[4][4], state[5][5] ],[state[3][2], state[4][3], state[5][4], state[6][5] ],
		[state[0][3], state[1][4], state[2][5], state[3][6] ],[state[1][3], state[2][4], state[3][5], state[4][6] ],[state[2][3], state[3][4], state[4][5], state[5][6] ],[state[3][3], state[4][4], state[5][5], state[6][6] ],

		[state[6][0], state[5][1], state[4][2], state[3][3] ],[state[5][0], state[4][1], state[3][2], state[2][3] ],[state[4][0], state[3][1], state[2][2], state[1][3] ],[state[3][0], state[2][1], state[1][2], state[0][3] ],
		[state[6][1], state[5][2], state[4][3], state[3][4] ],[state[5][1], state[4][2], state[3][3], state[2][4] ],[state[4][1], state[3][2], state[2][3], state[1][4] ],[state[3][1], state[2][2], state[1][3], state[0][4] ],
		[state[6][2], state[5][3], state[4][4], state[3][5] ],[state[5][2], state[4][3], state[3][4], state[2][5] ],[state[4][2], state[3][3], state[2][4], state[1][5] ],[state[3][2], state[2][3], state[1][4], state[0][5] ],
		[state[6][3], state[5][4], state[4][5], state[3][6] ],[state[5][3], state[4][4], state[3][5], state[2][6] ],[state[4][3], state[3][4], state[2][5], state[1][6] ],[state[3][3], state[2][4], state[1][5], state[0][6] ],


	];

	for (var i = 0; i < 88; i++) {
		//console.log(i)
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 4; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 4)
			return true;
	}
	return false;
}

/* Quien pierde */
function finDeJuegoAll(state) {
	return finDeJuego(state, H) || finDeJuego(state, PC);
}

function celdasVacias(state) {
	var celdas = [];
	for (var x = 0; x < 7; x++) {
		for (var y = 0; y < 7; y++) {
			if (state[x][y] == 0)
				celdas.push([x, y]);
		}
	}

	return celdas;
}

/* SI LA CELDA ESTÁ VACIA */
function validMove(x, y) {
	//var vacio = celdasVacias(tablero);
	try {
		console.log("x: "+x+" y: "+y)
		if (tablero[x][y] == 0) {
			console.log("Celda disponible");
			return true;
		}
		else {
			return false;
		}
	} catch (e) {
		return false;
	}
}

/* Set the move on tablero, if the coordinates are valid */
function setMove(x, y, player) {
	console.log("Verificando si es valido");
	if (validMove(x, y)) {
		tablero[x][y] = player;
		console.log("valid")

		return true;
	}
	else {
		console.log("inva")
		return false;
	}
}

/* *** Cual es el mejor movimiento *** */
function minimax(state, depth, player) {
	var best;
	if (player == PC) {
		best = [-1, -1, -1000];
	}
	else {
		best = [-1, -1, +1000];
	}
	if (depth == 0 || finDeJuegoAll(state)) {
		var score = evaluar(state);
		return [-1, -1, score];
	}
	celdasVacias(state).forEach(function (cell) {
		var x = cell[0];
		var y = cell[1];
		state[x][y] = player;
		var score;
		score[0] = x;
		score[1] = y;
		best=score
		var score = minimax(state, depth - 1, -player);
		state[x][y] = 0;
		score[0] = x;
		score[1] = y;
		if (player == PC) {
			if (score[2] > best[2])
				best = score;
		}
		else {
			if (score[2] < best[2])
				best = score;
		}
	});
	return best;
}

/* Turno del MINIMAX */
function aiTurn() {
	var x, y;
	var move;
	var cell;

	if (celdasVacias(tablero).length == 49) {
		x = parseInt(Math.random() * 7);
		y = parseInt(Math.random() * 7);
	}
	else {
		console.log("No están todas vacias");
		console.log(celdasVacias(tablero).length);
		move = minimax(tablero, celdasVacias(tablero).length, PC);
		console.log("MinimaxCompleto");
		x = move[0];
		y = move[1];
	}

	console.log("setMove");
	if (setMove(x, y, PC)) {
		console.log("Respuesta");
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

/* main */
async function celdaSeleccionada(cell) {
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	var conditionToContinue = finDeJuegoAll(tablero) == false && celdasVacias(tablero).length > 0;
	//console.log(celdasVacias(tablero).length);

	if (conditionToContinue) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = setMove(x, y, H);
		if (move == true) {
			cell.innerHTML = "X";
			console.log("Entra a minimax");
			await sleep(0.01);
			aiTurn();
			await sleep(0.01);
			console.log("Sale de minimax");
		
		}
	}
	if (finDeJuego(tablero, PC)) {
		var cell;
		var msg;

		msg = document.getElementById("message");
		msg.innerHTML = "La embarraste!";
	}
	if (celdasVacias(tablero).length == 0 && !finDeJuegoAll(tablero)) {
		var msg = document.getElementById("message");
		msg.innerHTML = "Empatados!";
	}
	if (finDeJuegoAll(tablero) == true || celdasVacias(tablero).length == 0) {
		button.value = "Reiniciar";
		button.disabled = false;
	}
}

/* Reiniciar Juego*/
function restartBnt(button) {
	if (button.value == "Iniciar MINMAX") {
		aiTurn();
		button.disabled = true;
	}
	else if (button.value == "Reiniciar") {
		var htmltablero;
		var msg;

		for (var x = 0; x < 7; x++) {
			for (var y = 0; y < 7; y++) {
				tablero[x][y] = 0;
				htmltablero = document.getElementById(String(x) + String(y));
				htmltablero.style.color = "#444";
				htmltablero.innerHTML = "";
			}
		}
		button.value = "Iniciar MINMAX";
		msg = document.getElementById("message");
		msg.innerHTML = "";
	}
}

async function sleep(seconds) {
	return new Promise(resolve=>setTimeout(resolve,seconds*1000));
}