const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.jpg$/i,
				type: "asset/resource",
			},
			{
				test: /\.scss$/, // Matches .scss files
				use: [
					"style-loader", // Injects styles into the DOM
					"css-loader", // Turns CSS into CommonJS
					"sass-loader", // Compiles Sass to CSS
				],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
