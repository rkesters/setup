import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as webpack from 'webpack';
import * as path from 'path';
import minifiPlugin from 'terser-webpack-plugin';

const config: webpack.Configuration = {
	entry: './src/index.tsx',
	devtool: process.env.WEBPACK_MODE === 'production' ? 'source-map' : 'cheap-module-source-map',
	mode: (process.env.WEBPACK_MODE as any) || 'development',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		usedExports: true,
		minimizer: [
			new minifiPlugin({
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: 6,
					sourceMap: { content: 'inline' },
				},
			}),
		],
		minimize: process.env.WEBPACK_MODE === 'production',
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { modules: false },
					},
				],
			},
			{
				test: /\.less$/i,
				use: [
					'style-loader',
					{
						loader: '@teamsupercell/typings-for-css-modules-loader',
						options: { formatter: 'prettier' },
					},
					{
						loader: 'css-loader',
						options: { modules: true },
					},
					'less-loader',
				],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
				exclude: /node_modules/,
				options: {
					outputPath: 'fonts',
					name() {
						if (process.env.NODE_ENV === 'development') {
							return '[path][name].[ext]';
						}

						return '[contenthash].[ext]';
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	plugins: [
		new HtmlWebpackPlugin({
			// Also generate a test.html
			template: 'src/index.html',
			showErrors: true,
		}),
		new webpack.WatchIgnorePlugin([/less\.d\.ts$/]),
		new webpack.EnvironmentPlugin({ NODE_ENV: process.env.WEBPACK_MODE ?? 'development', DEBUG: false }),
	],
};

export default config;
