import React from 'react';
const ReactPropTypes = React.PropTypes;
import AppActions from '../actions/AppActions';

class FloatingActiveButton extends React.Component {
	static propTypes = {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		value: ReactPropTypes.string,
	}

	constructor( props ) {
		super( props );
	}

	_onClick() {
		AppActions.reset();
	}

	render() {
		return (
			<button
				className="floating-action-button"
				onClick = { this._onClick }
			></button>
		);
	}
}

export default FloatingActiveButton;
