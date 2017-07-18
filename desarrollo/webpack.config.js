var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const fs = require('fs');
let ruta = 'C:\\Users\\mc185249\\Desktop\\work\\inventarioServer\\public\\js';

function readAndWrite(file) {
    return new Promise((resolve,reject)=>{
        fs.readFile(`./src/public/js/${file}`,(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            fs.writeFile(`${ruta}${file}`,data,(err)=>{
                if(err){
                    reject(err);
                    return;
                }
                resolve("success");
            });
        });
    });
}

function enviarBundle() {
    return Promise.all([readAndWrite('bundle.js'),readAndWrite('bundle.js.map')])
}

module.exports = {
    devtool: 'source-map',
    entry: {
        app: path.resolve(`${__dirname}/src/app/client.js`)
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs','es6-promise', 'transform-decorators-legacy', 'transform-class-properties','transform-object-assign'],
                }
            }
        ]
    },
    output: {
        path: path.resolve(`${__dirname}/src/public/js`),
        filename: 'bundle.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};