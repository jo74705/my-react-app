// 這邊使用 HtmlWebpackPlugin，將 bundle 好的 <script> 插入到 body。${__dirname} 為 ES6 語法對應到 __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	template: `${__dirname}/app/index.html`,
	filename: 'index.html',
	inject: 'body',
});

module.exports = {
	// 檔案起始點從 entry 進入，因為是陣列所以也可以是多個檔案
	entry: [
		'./app/index.js',
	],
	// output 是放入產生出來的結果的相關參數
	output: {
		path: `${__dirname}/dist`,
		filename: 'index_bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react'],
				},
			}, {
				test: /\.css$/,
				use: ['style-loader', 'css-loader', {
					loader: "postcss-loader",
					options: {
						plugins: () => [require('autoprefixer')]
					}
				}]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader", // creates style nodes from JS strings
					"css-loader",   // translates CSS into CommonJS
					{
						loader: "postcss-loader",
						options: {
							plugins: () => [require('autoprefixer')]
						}
					},
					"sass-loader"   // compiles Sass to CSS
				]
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 40000 }
					},
					'image-webpack-loader'
				]
			},
		],
	},
	// devServer 則是 webpack-dev-server 設定
	devServer: {
		inline: true,
		port: 8080,
	},
	resolve: {
		// modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		// import alias
		alias: {
			// "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/styles/antdIcons.js"),
			// api: path.resolve(__dirname, './src/actions/api.js'),
		},
		// // import 時可不寫附檔名
		extensions: [".js", ".css", ".scss", ".json"]
	},
	// plugins 放置所使用的外掛
	plugins: [HTMLWebpackPluginConfig],
};