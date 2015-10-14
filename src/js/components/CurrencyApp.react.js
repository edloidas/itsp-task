import React from 'react';
import CurrencyStore from '../stores/CurrencyStore';
import DateInput from './DateInput.react';
import SelectInput from './SelectInput.react';
import FloatingActiveButton from './FloatingActiveButton.react';

/**
 * Retrieve the current data from the CurrencyStore
 */
function getCurrencyState() {
	return {
		firstDate: CurrencyStore.getFirstDate(),
		lastDate: CurrencyStore.getLastDate(),
		selected: CurrencyStore.getSelected(),
		currencyList: CurrencyStore.getCurrencyList(),
	};
}

class CurrencyApp extends React.Component {
	constructor( props ) {
		super( props );
	}

	state = getCurrencyState();

	componentDidMount() {
		CurrencyStore.addChangeListener( this._onChange );
	}

	componentWillUpdate( nextProps, nextState ) {
		console.log( nextProps, nextState );
	}

	componentWillUnmount() {
		CurrencyStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		this.state = getCurrencyState();
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
					value = { this.state.firstDate }
				/>
				<DateInput
					className = "date-input date-input__last"
					inputClassName = "date-input--input"
					labelClassName = "date-input--label"
					labelText = "To:"
					id = "lastDate"
					value = { this.state.lastDate }
				/>
				<SelectInput
					className = "select-input"
					id = "currencyTypes"
					value = { this.state.selected }
					options = { this.state.currencyList }
				/>
				<FloatingActiveButton className = "floating-action-button"/>
			</div>
		);
	}
}

export default CurrencyApp;
