import React, { Component, PropTypes } from 'react';
import AppActions from '../actions/AppActions';

class FloatingActiveButton extends Component {
	static propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		value: PropTypes.string,
		title: PropTypes.string,
	}

	constructor( props ) {
		super( props );
	}

	_onClick() {
		AppActions.refresh();
	}

	render() {
		return (
			<button
				className = { this.props.className }
				onClick = { this._onClick }
				title = { this.props.title }
			></button>
		);
	}
}

export default FloatingActiveButton;
