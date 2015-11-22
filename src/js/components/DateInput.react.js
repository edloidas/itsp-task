import React, { Component, PropTypes } from 'react';

class DateInput extends Component {
	static propTypes = {
		className: PropTypes.string,
		labelClassName: PropTypes.string,
		inputClassName: PropTypes.string,
		labelText: PropTypes.string,
		id: PropTypes.string,
		placeholder: PropTypes.string,
		value: PropTypes.string,
		onSave: PropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );
		this.insertSeparator = this.insertSeparator.bind(this);
		this.formatValue = this.formatValue.bind(this);
		this._onChange = this._onChange.bind(this);
		this._save = this._save.bind(this);
	}


	state = {
		value: this.props.value || '',
	}

	componentDidUpdate() {
	}

	insertSeparator( value, position ) {
		if ( value.length > position ) {
			return [ value.slice( 0, position ), '-', value.slice( position ) ].join( '' );
		}
		return value;
	}

	formatValue( value ) {
		let date = value.replace( /\D/g, '' ).slice( 0, 8 );
		date = this.insertSeparator( date, 6 );
		date = this.insertSeparator( date, 4 );
		return date;
	}

	_onChange( event ) {
		const formattedValue = this.formatValue( event.target.value );
		this.setState({
			value: formattedValue,
		});
		this._save( formattedValue );
	}

	_save( value ) {
		if ( value.length === 10 ) {
			this.props.onSave( value );
		}
	}

	render() {
		return (
			<div className = { this.props.className }>
				<input
					className = { this.props.inputClassName }
					id = { this.props.id }
					placeholder = "YYYY-MM-DD"
					onChange = { this._onChange }
					value = { this.state.value }
					autoFocus
				/>
				<label
					className = { this.props.labelClassName }
					htmlFor = { this.props.id }
				>{ this.props.labelText }</label>
			</div>
		);
	}
}

export default DateInput;
