import AppDispatcher from '../dispatcher/AppDispatcher';
import Events from 'events';
import AppConstants from '../constants/AppConstants';
import CurrencyRange from '../currency/CurrencyRange';
// import assign from 'object-assign';

const EventEmitter = Events.EventEmitter;

const CHANGE_EVENT = 'change';

class CurrencyStoreEvents extends EventEmitter {

	getCurrency() {
		return CurrencyRange;
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
	console.log(JSON.stringify(CurrencyRange));
	switch ( action.actionType ) {
	case AppConstants.UPDATE_SELECTED:
		CurrencyRange.setSelected( action.selected );
		CurrencyStore.emitChange();
		break;

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
	console.log(JSON.stringify(CurrencyRange));
});

export default CurrencyStore;
