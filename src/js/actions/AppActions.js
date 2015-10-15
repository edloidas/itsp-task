import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const AppActions = {
	updateSelected: ( selected ) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE_SELECTED,
			selected: selected,
		});
	},
	update: ( isFirst, date ) => {
		AppDispatcher.dispatch({
			actionType: AppConstants.UPDATE,
			date: date,
			isFirst: isFirst,
		});
	},
	refresh: () => {
		AppDispatcher.dispatch({
			actionType: AppConstants.REFRESH,
		});
	},
};

export default AppActions;
