const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    webpack: (config) => {
      config.plugins = [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
      ];
  
      return config;
    },
  };