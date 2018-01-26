const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV;

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react',
};

const reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom',
};

const reduxExternal = {
  root: 'Redux',
  commonjs2: 'redux',
  commonjs: 'redux',
  amd: 'redux',
};

const reactReduxExternal = {
  root: 'ReactRedux',
  commonjs2: 'react-redux',
  commonjs: 'react-redux',
  amd: 'react-redux',
};

const ReactCSSTransitionGroupExternal = {
  root: ['React', 'addons', 'CSSTransitionGroup'],
  commonjs2: 'react-addons-css-transition-group',
  commonjs: 'react-addons-css-transition-group',
  amd: 'react-addons-css-transition-group',
};

const propTypesExternal = {
  root: 'PropTypes',
  commonjs2: 'prop-types',
  commonjs: 'prop-types',
  amd: 'prop-types',
};

const config = {
  mode: env == "production" ? 'production' : 'development',
  externals: {
    react: reactExternal,
    redux: reduxExternal,
    'react-redux': reactReduxExternal,
    'react-addons-css-transition-group': ReactCSSTransitionGroupExternal,
    'react-dom': reactDomExternal,
    'prop-types': propTypesExternal,
  },
  resolve: {
    modules: ['./node_modules', path.resolve(__dirname, 'src')],
  },
  output: {
    library: 'ReactReduxNotify',
    libraryTarget: env !== 'lib' ? 'umd' : 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-class-properties',
            'transform-es2015-destructuring',
            'transform-object-rest-spread',
          ],
          presets: ['es2015', 'react'],
          env: {
            production: {
              plugins: ['transform-react-remove-prop-types'],
            },
          },
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass?sourceMap'
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'postcss-loader'          
        ),
      },
    ],
  },
  plugins: [],
};

if (env === 'development' || env === 'lib') {
  config.plugins.push(new ExtractTextPlugin('ReactReduxNotify.css'));
}

if (env === 'production') {
  config.plugins.push(new ExtractTextPlugin('ReactReduxNotify.min.css'));
}

module.exports = config;
