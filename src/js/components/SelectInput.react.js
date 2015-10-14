import React from 'react';
const ReactPropTypes = React.PropTypes;

class SelectInput extends React.Component {
	static propTypes = {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		value: ReactPropTypes.string,
		options: ReactPropTypes.array,
	}

	constructor( props ) {
		super( props );
		this._onChange = this._onChange.bind(this);
	}

	state = {
		value: this.props.value || '',
	}

	_onChange( event ) {
		this.setState({
			value: event.target.value,
		});
	}

	render() {
		const options = this.props.options.map( ( value ) => {
			return ( <option value = {value} key = {value}>{ value }</option> );
		});

		return (
			<select
				className = { this.props.className }
				id = { this.props.id }
				onChange = { this._onChange }
				value = { this.state.value }
				autoFocus
			>
				{ options }
			</select>
		);
	}
}

export default SelectInput;
