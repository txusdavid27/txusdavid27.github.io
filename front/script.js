/*
	PROYECTO ANÁLISIS DE ALGORITMOS.
*/
var tablero = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
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
		[state[0][0], state[0][1], state[0][2]],
		[state[1][0], state[1][1], state[1][2]],
		[state[2][0], state[2][1], state[2][2]],
		[state[0][0], state[1][0], state[2][0]],
		[state[0][1], state[1][1], state[2][1]],
		[state[0][2], state[1][2], state[2][2]],
		[state[0][0], state[1][1], state[2][2]],
		[state[2][0], state[1][1], state[0][2]],
	];

	for (var i = 0; i < 8; i++) {
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
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
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (state[x][y] == 0)
				celdas.push([x, y]);
		}
	}

	return celdas;
}

/* SI LA CELDA ESTÁ VACIA */
function validMove(x, y) {
	var vacio = celdasVacias(tablero);
	try {
		if (tablero[x][y] == 0) {
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
	if (validMove(x, y)) {
		tablero[x][y] = player;
		return true;
	}
	else {
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

	if (celdasVacias(tablero).length == 9) {
		x = parseInt(Math.random() * 3);
		y = parseInt(Math.random() * 3);
	}
	else {
		move = minimax(tablero, celdasVacias(tablero).length, PC);
		x = move[0];
		y = move[1];
	}

	if (setMove(x, y, PC)) {
		cell = document.getElementById(String(x) + String(y));
		cell.innerHTML = "O";
	}
}

/* main */
function celdaSeleccionada(cell) {
	var button = document.getElementById("bnt-restart");
	button.disabled = true;
	var conditionToContinue = finDeJuegoAll(tablero) == false && celdasVacias(tablero).length > 0;

	if (conditionToContinue == true) {
		var x = cell.id.split("")[0];
		var y = cell.id.split("")[1];
		var move = setMove(x, y, H);
		if (move == true) {
			cell.innerHTML = "X";
			if (conditionToContinue)
				aiTurn();
		}
	}
	if (finDeJuego(tablero, PC)) {
		var lines;
		var cell;
		var msg;

		if (tablero[0][0] == 1 && tablero[0][1] == 1 && tablero[0][2] == 1)
			lines = [[0, 0], [0, 1], [0, 2]];
		else if (tablero[1][0] == 1 && tablero[1][1] == 1 && tablero[1][2] == 1)
			lines = [[1, 0], [1, 1], [1, 2]];
		else if (tablero[2][0] == 1 && tablero[2][1] == 1 && tablero[2][2] == 1)
			lines = [[2, 0], [2, 1], [2, 2]];
		else if (tablero[0][0] == 1 && tablero[1][0] == 1 && tablero[2][0] == 1)
			lines = [[0, 0], [1, 0], [2, 0]];
		else if (tablero[0][1] == 1 && tablero[1][1] == 1 && tablero[2][1] == 1)
			lines = [[0, 1], [1, 1], [2, 1]];
		else if (tablero[0][2] == 1 && tablero[1][2] == 1 && tablero[2][2] == 1)
			lines = [[0, 2], [1, 2], [2, 2]];
		else if (tablero[0][0] == 1 && tablero[1][1] == 1 && tablero[2][2] == 1)
			lines = [[0, 0], [1, 1], [2, 2]];
		else if (tablero[2][0] == 1 && tablero[1][1] == 1 && tablero[0][2] == 1)
			lines = [[2, 0], [1, 1], [0, 2]];

		for (var i = 0; i < lines.length; i++) {
			cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
			cell.style.color = "red";
		}

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

		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
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
