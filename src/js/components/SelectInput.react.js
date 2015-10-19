import React, { PropTypes } from 'react';

class SelectInput extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		id: PropTypes.string,
		value: PropTypes.string.isRequired,
		options: PropTypes.array.isRequired,
		onSave: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );
		this._save = this._save.bind( this );
		this._onChange = this._onChange.bind( this );
	}

	state = {
		value: this.props.value || '',
	}

	_save( value ) {
		this.props.onSave( value );
	}

	_onChange( event ) {
		this.setState({
			value: event.target.value,
		});
		this._save( event.target.value );
	}

	render() {
		const optionsMap = ( value ) => {
			return ( <option value = { value.name } key = { value.id }>{ value.name }</option> );
		};

		return (
			<select
				className = { this.props.className }
				id = { this.props.id }
				onChange = { this._onChange }
				value = { this.state.value }
				autoFocus
			>
				{ this.props.options.map( optionsMap ) }
			</select>
		);
	}
}

export default SelectInput;
