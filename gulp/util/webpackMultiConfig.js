import CONFIG          from '../config';

import path            from 'path';
import webpack         from 'webpack';
import webpackManifest from './webpackManifest';

export default ( env ) => {
	let jsSrc = path.resolve( CONFIG.root.src, CONFIG.tasks.js.src );
	let jsDest = path.resolve( CONFIG.root.dest, CONFIG.tasks.js.dest );
	let publicPath = path.join( CONFIG.tasks.js.src, '/' );
	// Use '[name]-[hash].js' for production instead
	let filenamePattern = env === 'production' ? '[name].js' : '[name].js';
	let extensions = CONFIG.tasks.js.extensions.map( ( extension ) => {
		return '.' + extension;
	});

	let webpackConfig = {
		context: jsSrc,
		plugins: [],
		resolve: {
			extensions: [ '' ].concat( extensions )
		},
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
					query: { stage: 0 }
				}
			]
		}
	};

	if ( env !== 'test' ) {
		// Test engine doesn't need entry points or output settings
		webpackConfig.entry = CONFIG.tasks.js.entries;

		webpackConfig.output= {
			path: path.normalize( jsDest ),
			filename: filenamePattern,
			publicPath: publicPath
		};

		if ( CONFIG.tasks.js.extractSharedJs ) {
			// Factor out common dependencies into a shared.js
			webpackConfig.plugins.push(
				new webpack.optimize.CommonsChunkPlugin({
					name: 'shared',
					filename: filenamePattern,
				})
			);
		}
	}

	if ( env === 'development' ) {
		// webpackConfig.devtool = 'source-map';
		webpack.debug = true;
	}

	if ( env === 'production' ) {
		webpackConfig.plugins.push(
			// new webpackManifest( publicPath, CONFIG.root.dest ),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify( 'production' )
				}
			}),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.NoErrorsPlugin()
		);
	}

	return webpackConfig;
};