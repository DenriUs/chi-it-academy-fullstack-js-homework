import path from 'path';
import { fileURLToPath } from 'url';

import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (_env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: {
      bundle: './src/main.jsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: '[hash].[ext]',
      publicPath: process.env.PUBLIC_PATH || '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@providers': path.resolve(__dirname, 'src/providers'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env'], ['@babel/preset-react', { runtime: 'automatic' }]],
            },
          },
        },
        {
          test: /\.css/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 3000,
      hot: true,
      open: true,
      compress: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      new webpack.DefinePlugin({
        'process.env.PUBLIC_PATH': JSON.stringify(process.env.PUBLIC_PATH || '/'),
      }),
    ],
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
