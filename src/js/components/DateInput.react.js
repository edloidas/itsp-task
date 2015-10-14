import React from 'react';
const ReactPropTypes = React.PropTypes;

class DateInput extends React.Component {
	static propTypes = {
		className: ReactPropTypes.string,
		labelClassName: ReactPropTypes.string,
		inputClassName: ReactPropTypes.string,
		labelText: ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		value: ReactPropTypes.string,
		// onSave: ReactPropTypes.func.isRequired,
	}

	constructor( props ) {
		super( props );
		this._onChange = this._onChange.bind(this);
		this.insertSeparator = this.insertSeparator.bind(this);
		this.formatValue = this.formatValue.bind(this);
	}


	state = {
		value: this.props.value || '',
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
		this.setState({
			value: this.formatValue( event.target.value ),
		});
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
