import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import AppConstants from '../constants/AppConstants';
import CurrencyRange from '../currency/CurrencyRange';
import lodash from 'lodash';

const CHANGE_EVENT = 'change';

class CurrencyStoreEvents extends EventEmitter {

	constructor( props ) {
		super( props );
		this.emitDelayedChange =
			lodash.debounce( this.emitChange.bind( this ), 1000, { leading: true } );
	}

	getCurrency() {
		return CurrencyRange;
	}

	emitChange() {
		this.emit( CHANGE_EVENT );
	}

	// emitDelayedChange() { ... }

	addChangeListener( callback ) {
		this.on( CHANGE_EVENT, callback );
	}

	removeChangeListener( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	}
}

const CurrencyStore = new CurrencyStoreEvents();


AppDispatcher.register( ( action ) => {
	switch ( action.actionType ) {
	case AppConstants.UPDATE_SELECTED:
		CurrencyRange.setSelected( action.selected );
		CurrencyRange._loadData().then( () => {
			CurrencyStore.emitDelayedChange();
		});
		break;

	case AppConstants.UPDATE:
		const date = CurrencyRange.parseCustomDate( action.date, action.isFirst );
		if ( date ) {
			CurrencyRange._loadData().then( () => {
				CurrencyStore.emitDelayedChange();
			});
		}
		break;

	case AppConstants.REFRESH:
		CurrencyRange._loadData().then( () => {
			CurrencyStore.emitDelayedChange();
		});
		break;

	default:
	}
});

export default CurrencyStore;
