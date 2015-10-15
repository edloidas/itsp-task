import React from 'react';
import ReactDOM from 'react-dom';
const ReactPropTypes = React.PropTypes;
import Chart from 'chart.js';

class Graph extends React.Component {
	static propTypes = {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		width: React.PropTypes.number.isRequired,
		height: React.PropTypes.number.isRequired,
		data: ReactPropTypes.object.isRequired,
		label: ReactPropTypes.string.isRequired,
		options: ReactPropTypes.object,
	}

	constructor( props ) {
		super( props );
		this.draw = this.draw.bind( this );
		this.chart = null;
	}

	componentDidMount() {
		const context = ReactDOM.findDOMNode( this ).getContext( '2d' );
		this.draw( context );
	}

	componentDidUpdate() {
		const context = ReactDOM.findDOMNode( this ).getContext( '2d' );
		context.clearRect( 0, 0, this.props.width, this.props.height );
		this.chart.destroy();
		this.draw( context );
	}

	draw( context ) {
		const data = {
			labels: this.props.data.labels,
			datasets: [
				{
					label: this.props.label,
					fillColor: 'rgba(151,187,205,0.2)',
					strokeColor: 'rgba(151,187,205,1)',
					pointColor: 'rgba(151,187,205,1)',
					pointStrokeColor: '#fff',
					pointHighlightFill: '#fff',
					pointHighlightStroke: 'rgba(151,187,205,1)',
					data: this.props.data.rates,
				},
			],
		};
		this.chart = new Chart( context ).Line( data, this.props.options );
	}

	render() {
		return (
			<canvas
				width = { this.props.width }
				height = { this.props.height }
				className = { this.props.className }
			/>
		);
	}
}

export default Graph;
