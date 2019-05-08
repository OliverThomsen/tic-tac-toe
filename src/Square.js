import React from 'react'


function Square(props) {
	return (
		<button value={!props.value ? '' : (props.value === 'X' ? 'X' : 'O')} className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}


export default Square
