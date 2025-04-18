import React, { Component } from 'react';
import './Button.css';

export class Button extends Component {
	render() {
		const { children, onClick } = this.props;

		return (
			<button className="custom-button" onClick={onClick}>
				{children}
			</button>
		);
	}
}
