import moment from 'moment';
import Q from 'q';
import lodash from 'lodash';
import jQuery from 'jquery';
import XmlParser from 'xml2js';

function CurrencyRange() {
	this.delay = 1000;
	this.firstDate = new Date();
	this.lastDate = new Date();
	this.selected = 'USD';
	this.currency = [
		{ id: 145, name: 'USD' },
		{ id: 19, name: 'EUR' },
	];
	this.graphData = {
		labels: [],
		rates: [],
	};
	Object.freeze( this.currency );
	Object.seal( this.graphData );

	this.reset = () => {
		const date = new Date();
		date.setDate( date.getDate() - 7 );
		this.firstDate = date;
		this.lastDate = new Date();
	};
	// Update the date values on construct
	this.reset();

	this.parseCustomDate = ( value, isFirst ) => {
		if ( isFirst ) {
			return this.parseFirstDate( value );
		}
		return this.parseLastDate( value );
	};

	this._parseDate = ( value ) => {
		const date = new Date( value );

		if ( Object.prototype.toString.call( date ) === '[object Date]' ) {
			if ( !isNaN( date.getTime() ) ) {
				return date;
			}
		}

		return null;
	};

	this._isInRange = ( date, isFirst ) => {
		const otherDate = isFirst ? this.lastDate : this.firstDate;
		return date.toDateString() === otherDate.toDateString() ||
			( isFirst ? date.valueOf() < otherDate.valueOf() : otherDate.valueOf() < date.valueOf() );
	};

	this.parseFirstDate = ( value ) => {
		const date = this._parseDate( value );
		if ( date && this._isInRange( date, true ) ) {
			this.firstDate = date;
			return this.firstDate;
		}

		return null;
	};

	this.parseLastDate = ( value ) => {
		const date = this._parseDate( value );
		if ( date && this._isInRange( date, false ) ) {
			this.lastDate = date;
			return this.lastDate;
		}

		return null;
	};

	this.getFirstDate = () => {
		return moment( this.firstDate ).format('YYYY-MM-DD');
	};

	this.getLastDate = () => {
		return moment( this.lastDate ).format('YYYY-MM-DD');
	};

	this.setSelected = ( value ) => {
		const contains = this.currency.find( ( currency ) => {
			return currency.name === value;
		});

		if ( contains ) {
			this.selected = value;
		}
	};

	this.getCurrency = () => {
		return this.currency;
	};

	this._getUrl = () => {
		const id = this.currency.find( ( value ) => { return value.name === this.selected; } ).id;
		const fromDate = moment( this.firstDate ).format( 'M/D/YYYY' );
		const toDate = moment( this.lastDate ).format( 'M/D/YYYY' );
		return `http://www.nbrb.by/Services/XmlExRatesDyn.aspx?curId=${id}&fromDate=${fromDate}&toDate=${toDate}`;
	};

	this._filterData = ( data ) => {
		let filteredData = data.replace( /<body>/g, '' );
		filteredData = filteredData.replace( /<\/body>/g, '' );
		filteredData = filteredData.replace( /&#xd;/g, '' );
		return filteredData.trim();
	};

	this._loadData = () => {
		// Not good enough support in old browsers for:
		// return new Promise( ( resolve, reject )
		const deferred = Q.defer();
		const url = `http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22${encodeURIComponent(this._getUrl())}%22&format=xml'&callback=?`;

		jQuery.getJSON(url, ( data ) => {
			if (data.results[0]) {
				let xml = data.results[0];

				xml = xml.replace(/<body>/g, '');
				xml = xml.replace(/<\/body>/g, '');
				xml = xml.replace(/&#xd;/g, '');
				xml = xml.trim();

				XmlParser.parseString( xml, ( err, result ) => {
					if ( result && result.currency && result.currency.length !== 0) {
						this.graphData.labels = result.currency.record.map( value => { return moment( new Date( value.$.date ) ).format( 'YYYY-MM-DD' ); } );
						this.graphData.rates = result.currency.record.map( value => { return value.rate[0]; } );
					}

					deferred.resolve( this.graphData );
				});
			} else {
				deferred.reject( Error( 'Data load failed' ) );
			}
		}).fail( () => {
			deferred.reject( Error( 'Data load failed' ) );
		});

		return deferred.promise;
	};

	this.delayedLoadData = lodash.debounce(
		this._loadData.bind( this ),
		this.delay,
		{ leading: true },
	);
}

export default new CurrencyRange();
