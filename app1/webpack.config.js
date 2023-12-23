const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
    mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [ new HtmlWebpackPlugin({ 
    template: "./public/index.html"
    //template: path.join(__dirname, "public", "index.html"),
  })
  ],
    devServer: {
        static: {
            directory: path.join(__dirname, "build"),
        },
        port: 3000,
    },
    module: {
        // exclude node_modules
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            }
        ],
      },
      // pass all js files through Babel
      resolve: {
        extensions: [ ".js",".jsx",".tsx"],
      }
}

