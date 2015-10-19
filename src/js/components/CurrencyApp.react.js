import React from 'react';
import CurrencyStore from '../stores/CurrencyStore';
import Graph from './Graph.react';
import DateInput from './DateInput.react';
import SelectInput from './SelectInput.react';
import FloatingActiveButton from './FloatingActiveButton.react';
import AppActions from '../actions/AppActions';

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
		AppActions.refresh();
	}

	componentWillUnmount() {
		CurrencyStore.removeChangeListener( this._onChange );
	}

	_onChange() {
		this.setState( getCurrencyState() );
	}

	_onFirstDateSave( value ) {
		AppActions.update( true, value );
	}

	_onLastDateSave( value ) {
		AppActions.update( false, value );
	}

	render() {
		return (
			<div>
				<Graph
					className = "graph"
					id = "firstDate"
					width = {860}
					height = {300}
					label = { this.state.selected }
					data = { this.state.graphData }
					options = { { scaleBeginAtZero: false } }
				/>
				<SelectInput
					className = "select-input"
					id = "currencyTypes"
					value = { this.state.selected }
					options = { this.state.currency }
					onSave = { AppActions.updateSelected.bind( AppActions ) }
				/>
				<DateInput
					className = "date-input date-input__first"
					inputClassName = "date-input--input"
					labelClassName = "date-input--label"
					labelText = "From:"
					id = "firstDate"
					value = { this.state.getFirstDate() }
					onSave = { AppActions.update.bind( AppActions, true ) }
				/>
				<DateInput
					className = "date-input date-input__last"
					inputClassName = "date-input--input"
					labelClassName = "date-input--label"
					labelText = "To:"
					id = "lastDate"
					value = { this.state.getLastDate() }
					onSave = { AppActions.update.bind( AppActions, false ) }
				/>
				<FloatingActiveButton
					className = "floating-action-button"
					title = "Refresh"
				/>
			</div>
		);
	}
}

export default CurrencyApp;
