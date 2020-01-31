const path = require('path'),
      SRC = path.join(__dirname, 'src/'),
      NODE_MODULES = path.join(__dirname, 'node_modules/');
const config = {
    entry: "./src",               // entry point
    output: {                     // output folder
        path: "./dist",           // folder path
        filename: "app.js"        // file name
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel"]   // babelify
            }
        ]
    },
    resolve: {
        root: [SRC, NODE_MODULES]   // root folders for Webpack resolving
    }
}

module.exports = config;
