'use strict'
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

var env = process.env.NODE_ENV || 'development'

var reactExternal = {
    root: 'React',
    commonjs2: 'react',
    commonjs: 'react',
    amd: 'react'
}

var reduxExternal = {
    root: 'Redux',
    commonjs2: 'redux',
    commonjs: 'redux',
    amd: 'redux'
}

var reactReduxExternal = {
    root: 'ReactRedux',
    commonjs2: 'react-redux',
    commonjs: 'react-redux',
    amd: 'react-redux'
}

var ReactCSSTransitionGroupExternal = {
    root: ['React','addons','CSSTransitionGroup'],
    commonjs2: 'react-addons-css-transition-group',
    commonjs: 'react-addons-css-transition-group',
    amd: 'react-addons-css-transition-group'    
}

var config = {
    externals: {
        'react': reactExternal,
        'redux': reduxExternal,
        'react-redux': reactReduxExternal,
        'react-addons-css-transition-group': ReactCSSTransitionGroupExternal
    },
    resolve: {
        root: [
            path.resolve('./src'),
        ]
    },  
    output: {
        library: 'ReactReduxNotify',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
                test    : /\.(js|jsx)$/,
                exclude : /node_modules/,
                loader  : 'babel',
                query   : {
                    cacheDirectory : true,
                    plugins        : ['transform-runtime', 'transform-class-properties'],
                    presets        : ['es2015', 'react'],
                    env            : {
                        production : {
                            plugins: ['transform-react-remove-prop-types']
                        }
                    },                
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader', 
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap'
                    )
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css')
            },        
        ]
    }, 
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),        
        new webpack.optimize.DedupePlugin()
    ]
}

if (env === 'development') {
    config.plugins.push(
        new ExtractTextPlugin('styles.css')
    )
}

if (env === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
        compressor: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false
        }
        })
    )
    config.plugins.push(
        new ExtractTextPlugin('styles.min.css')
    )  
}

module.exports = config