import React from "react";
import { useState } from "react";

function calculateNextValue(squares) {
	return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			// console.log(lines[i]);
			return squares[a];
		}
	}
	return null;
}

function calculateStatus(winner, squares, nextValue) {
	const conditionStatus = winner ? `Winner: ${winner}` : squares.every(Boolean) ? `DRAW` : `Player Turn: ${nextValue}`;
	// console.log(nextValue, "<<<<,");

	if (conditionStatus === "Winner: X") {
		return <h3 className="text-rose-400 text-2xl  font-extrabold">{conditionStatus}</h3>;
	} else if (conditionStatus === "Winner: O") {
		return <h3 className="text-indigo-400 text-2xl  font-extrabold">{conditionStatus}</h3>;
	} else {
		return <h3 className="text-zinc-50 text-2xl  font-bold">{conditionStatus}</h3>;
	}
}

function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));

	const nextValue = calculateNextValue(squares);
	const winner = calculateWinner(squares);
	const status = calculateStatus(winner, squares, nextValue);

	function selectSquare(index) {
		if (winner || squares[index]) {
			return;
		}
		const copySquares = [...squares];
		copySquares[index] = nextValue;
		setSquares(copySquares);
	}

	function restart() {
		setSquares(Array(9).fill(null));
	}

	// console.log(squares);

	function renderSquare(index) {
		// console.log(squares[i], `<<<<<, i`);
		// console.log(winner, `<<<<<<< winner`);
		if (winner !== "O" && squares[index] === "X") {
			return (
				<button className="border-none w-20 h-20 bg-zinc-50 font-sans  hover:bg-zinc-200 font-extrabold text-rose-600 rounded-md" onClick={() => selectSquare(index)}>
					<h1 className="text-6xl">{squares[index]}</h1>
				</button>
			);
		} else if (winner !== "X" && squares[index] === "O") {
			return (
				<button className="border-none w-20 h-20 bg-zinc-50 font-sans hover:bg-zinc-200 font-extrabold text-indigo-600 rounded-md" onClick={() => selectSquare(index)}>
					<p className="text-6xl">{squares[index]}</p>
				</button>
			);
		} else {
			return (
				<button className="border-none w-20 h-20 bg-zinc-50 font-sans hover:bg-zinc-200 font-extrabold text-zinc-600 rounded-md" onClick={() => selectSquare(index)}>
					<p className="text-6xl">{squares[index]}</p>
				</button>
			);
		}
	}

	return (
		<div className="m-auto px-12 pb-2 rounded-3xl border-8 border-zinc-50 bg-neutral-700">
			<div className="ml-2 mt-5 mb-2 pb-2">{status}</div>
			<div className="grid grid-cols-3 gap-2">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
			<div className="grid">
				<button className="p-2 bg-teal-500 text-zinc-100  mb-6 active:bg-teal-500 active:text-zinc-200 hover:bg-zinc-200 hover:text-teal-500 rounded-md my-4 text-lg font-bold" onClick={() => restart()}>
					Play Again
				</button>
			</div>
		</div>
	);
}

function Game() {
	return (
		<>
			<div className="font-bold pb-6 pt-12  text-center">
				<h1 className="inline text-zinc-50 text-6xl">Tic-Tac-Toe</h1>
			</div>
			<div className="m-auto grid">
				<Board />
			</div>
		</>
	);
}

function App() {
	return (
		<div className="bg-neutral-800 max-h-full min-h-screen">
			<Game />
		</div>
	);
}

export default App;
