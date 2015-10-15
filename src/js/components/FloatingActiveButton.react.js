import React from 'react';
const ReactPropTypes = React.PropTypes;
import AppActions from '../actions/AppActions';

class FloatingActiveButton extends React.Component {
	static propTypes = {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		value: ReactPropTypes.string,
		title: ReactPropTypes.string,
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
