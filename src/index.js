import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}

class Board extends React.Component {
	renderSquare(i) {
		return <Square
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
		/>
	}

	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		)
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			history: [{
				squares: Array(9).fill(null),
				lastSquare: null,
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const squares = history[history.length - 1].squares.slice()
		if (this.calculateWinner(squares) || squares[i]) {
			return
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O'
		this.setState({
			history: [...history, {
				squares,
				lastSquare: i,
			}],
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		})
	}

	calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let line of lines) {
			const [a, b, c] = line;
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		})
	}

	render() {
		const history = this.state.history
		const squaresCurrent = history[this.state.stepNumber].squares
		const winner = this.calculateWinner(squaresCurrent)

		const moves = history.map((step, move) => {
			const user = move % 2 === 0 ? 'O' : 'X'
			const x = step.lastSquare % 3 + 1;
			const y = Math.ceil((step.lastSquare + 1) / 3);
			const text = move ?
				`${user} at (${x},${y})` :
				`Go to game start`
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{text}</button>
				</li>
			)
		})

		let status;
		if (winner) {
			status = `${winner} won the game`
		} else {
			status = `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={squaresCurrent}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol start={0}>{moves}</ol>
				</div>
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
);


