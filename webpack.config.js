const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const path = require('path');

module.exports = {
  devServer: {
    port: 3000,
    contentBase: './public',
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              camelCase: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 40,
      maxAsyncRequests: 60,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /node_modules/,
          chunks: 'all',
          priority: -10,
          minChunks: 1,
        },
        default: {
          minChunks: 1,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
