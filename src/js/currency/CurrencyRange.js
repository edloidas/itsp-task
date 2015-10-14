import moment from 'moment';

function CurrencyRange() {
	this.firstDate = new Date();
	this.lastDate = new Date();
	this.selected = 'USD';
	this.currencyList = [ 'USD', 'EUR', 'RUB' ];
	Object.freeze( this.currencyList );


	this.reset = () => {
		this.firstDate = new Date();
		this.lastDate = new Date();
	};

	this.parseDate = ( value ) => {
		const date = new Date( value );

		if ( Object.prototype.toString.call( date ) === '[object Date]' ) {
			if ( !isNaN( date.getTime() ) ) {
				return date;
			}
		}

		return null;
	};

	this.parseFirstDate = ( value ) => {
		this.firstDate = this.parseDate( value );
		if ( !this.firstDate && !this.isPointOrRange() ) {
			this.firstDate = null;
		}

		return this.firstDate;
	};

	this.parseLastDate = ( value ) => {
		this.lastDate = this.parseDate( value );
		if ( !this.lastDate && !this.isPointOrRange() ) {
			this.lastDate = null;
		}

		return this.lastDate;
	};

	this.parseDates = ( firstValue, lastValue ) => {
		this.parseFirstDate( firstValue );
		this.parseLastDate( lastValue );

		return !this.isInvalid();
	};

	this.isFirstDateInvalid = () => {
		return this.firstDate === null;
	};

	this.isLastDateInvalid = () => {
		return this.firstDate === null;
	};

	this.isInvalid = () => {
		return this.isFirstDateInvalid() || this.isFirstDateInvalid();
	};

	this.isRange = () => {
		return this.firstDate.toDateString() !== this.lastDate.toDateString() &&
			this.firstDate.x.valueOf() < this.firstDate.x.valueOf();
	};

	this.isPoint = () => {
		return this.firstDate.toDateString() === this.lastDate.toDateString();
	};

	this.isPointOrRange = () => {
		return this.isPoint() || this.isRange();
	};

	this.getFirstDate = () => {
		return moment(this.firstDate).format('YYYY-MM-DD');
	};

	this.getLastDate = () => {
		return moment(this.lastDate).format('YYYY-MM-DD');
	};

	this.getSelected = () => {
		return this.selected;
	};

	this.setSelected = ( value ) => {
		const contains = this.currencyList.find( ( currency ) => { return value === currency; } );
		if ( contains ) {
			this.selected = value;
		}
	};

	this.getCurrencyList = () => {
		return this.currencyList;
	};
}

export default new CurrencyRange();
