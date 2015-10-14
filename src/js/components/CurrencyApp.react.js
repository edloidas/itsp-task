import React from 'react';
import CurrencyStore from '../stores/CurrencyStore';
import DateInput from './DateInput.react';
import SelectInput from './SelectInput.react';
import FloatingActiveButton from './FloatingActiveButton.react';

/**
 * Retrieve the current data from the CurrencyStore
 */
function getCurrencyState() {
	return CurrencyStore.getCurrency();
}

class CurrencyApp extends React.Component {
	constructor( props ) {
		super( props );
		this._onChange = this._onChange.bind(this);
	}

	state = getCurrencyState();

	componentDidMount() {
		CurrencyStore.addChangeListener( this._onChange );
	}

	componentWillUnmount() {
		CurrencyStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		this.setState( getCurrencyState() );
	}

	render() {
		return (
			<div>
				<DateInput
					className = "date-input date-input__first"
					inputClassName = "date-input--input"
					labelClassName = "date-input--label"
					labelText = "From:"
					id = "firstDate"
					value = { this.state.getFirstDate() }
				/>
				<DateInput
					className = "date-input date-input__last"
					inputClassName = "date-input--input"
					labelClassName = "date-input--label"
					labelText = "To:"
					id = "lastDate"
					value = { this.state.getLastDate() }
				/>
				<SelectInput
					className = "select-input"
					id = "currencyTypes"
					value = { this.state.getSelected() }
					options = { this.state.getCurrencyList() }
				/>
				<FloatingActiveButton className = "floating-action-button"/>
			</div>
		);
	}
}

export default CurrencyApp;
