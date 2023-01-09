const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    index: './src/pages/homepage/index.ts',
    shoppingCart: './src/pages/cart/shoppingCart.ts',
    goods: './src/pages/goods/goods.ts',
    page404: './src/pages/page404/404.ts',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: './src/pages/homepage/index.html',
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/cart/shoppingCart.html',
      filename: 'shoppingCart.html',
      chunks: ['shoppingCart'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/goods/goods.html',
      filename: 'goods.html',
      chunks: ['goods'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/page404/404.html',
      filename: '404.html',
      chunks: ['page404'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          noErrorOnMissing: true,
        },
      ],
    }),
    new NetlifyPlugin({
      redirects: [
        {
          from: '/*',
          to: '/404.html',
          status: 200,
        },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
