const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const incstr = require('incstr');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = (env, { mode }) => {
  const generateLocalIdentName = incstr.idGenerator();
  const cssContexts = {};

  /**
  * Create a local identity for a css className.
  *
  * This method is used to allow for easy CSS module usage in development
  * while using a full hash system in production. Essentially this means that
  * CSS classnames in development will retain their defined classname as a
  * prefix and attach a simple unique suffix (ex .app => .app_xU)
  *
  * @param {*} context
  * @param {*} localIdentName
  * @param {*} localName
  */
  function getLocalIdent(context, localIdentName, localName) {
    const { resourcePath } = context;

    // Ignore all node_moduled CSS
    if (resourcePath.includes('node_modules')) {
      return localName;
    }

    cssContexts[resourcePath] = cssContexts[resourcePath] || {};
    const classMap = cssContexts[resourcePath] || {};
    let id = classMap[localName];

    if (id == null) {
      do {
        id = generateLocalIdentName();
      } while (!Number.isNaN(Number(id)));
      classMap[localName] = id;
    }

    // During production, the full has is used as the new className
    if (mode === 'production') {
      return id;
    }

    // During development, retain the defined classname (localName) and
    // suffix it with a short hash:
    return `${localName}_${id}`;
  }

  return ({
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    entry: './src/main.jsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[hash].js',
      publicPath: '/',
    },
    devServer: {
      contentBase: path.resolve(__dirname, './src'),
      host: '0.0.0.0',
      port: 8000,
      hot: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
          options: {
            cacheDirectory: true,
            envName: mode,
          },
        },
        {
          test: /\.css$/,
          use: [
            mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: true,
                camelCase: true,
                getLocalIdent,
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff2?)(\?.*)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(gif|jpe?g|png|svg)(\?.*)?$/,
          use: [
            'file-loader',
            'image-webpack-loader',
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[hash].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('src/index.html'),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
        },
      }),
      new CleanWebpackPlugin(['dist'], {
        verbose: true,
      }),
      mode === 'development' && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
  });
};
