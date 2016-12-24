var path = require('path');

module.exports = {
    entry: "./index.jsx",
    output: {
      path: 'public',
      filename: "bundle.js"
    },
    module: {
      loaders: [
        { test: /\.jsx$/, loader: "jsx-loader" },
        { test: /\.scss$/, loaders: ["style", "css", "sass"] }
      ]
    }
}