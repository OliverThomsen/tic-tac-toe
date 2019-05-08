import React from 'react'
import Square from './Square'


class Board extends React.Component {
	renderSquare(i) {
		return <Square
			value={this.props.squares[i]}
			key={i}
			onClick={() => this.props.onClick(i)}
		/>
	}

	render() {
		let count = 0
		let rows = []
		for (let i = 0; i < 3; i++) {
			let cols = []
			for (let j = 0; j < 3; j++) {
				cols.push(this.renderSquare(count++))
			}
			rows.push(<div className="board-row" key={i}>{cols}</div>)
		}

		return (
			<div>
				{rows}
			</div>
		)
	}
}

export default Board
