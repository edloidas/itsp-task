import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {

	updateSelected: ( selected ) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_SELECTED,
			selected: selected,
		});
	},
	update: ( date, isFirst ) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE,
			date: date,
			isFirst: isFirst,
		});
	},
	reset: () => {
		AppDispatcher.dispatch({
			actionType: AppConstants.RESET,
		});
	},
};

export default AppActions;
