import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'events';
import moment from 'moment';
import AppConstants from '../constants/AppConstants';
import CurrencyRange from '../currency/CurrencyRange';
// import assign from 'object-assign';

const EventEmitter = Events.EventEmitter;

const CHANGE_EVENT = 'change';

class CurrencyStoreEvents extends EventEmitter {

	getFirstDate() {
		return moment(CurrencyRange.firstDate).format('YYYY-MM-DD');
	}

	getLastDate() {
		return moment(CurrencyRange.lastDate).format('YYYY-MM-DD');
	}

	getSelected() {
		return CurrencyRange.getSelected();
	}

	getCurrencyList() {
		return CurrencyRange.getCurrencyList();
	}

	emitChange() {
		this.emit( CHANGE_EVENT );
	}

	addChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	}

	removeChangeListener( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	}
}

const CurrencyStore = new CurrencyStoreEvents();


AppDispatcher.register( ( action ) => {
	let date;

	switch ( action.actionType ) {
	case AppConstants.UPDATE:
		date = action.date.trim();
		if ( date !== '' ) {
			if ( action.isFirst ) {
				CurrencyRange.parseFirstDate( date );
			} else {
				CurrencyRange.parseLastDate( date );
			}
			CurrencyStore.emitChange();
		}
		break;

	case AppConstants.RESET:
		CurrencyRange.reset();
		CurrencyStore.emitChange();
		break;

	default:
	}
});

export default CurrencyStore;
