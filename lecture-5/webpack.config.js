import path from 'path';
import { fileURLToPath } from 'url';

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
      filename: 'src/main/[name].[contenthash].js',
      assetModuleFilename: 'src/assets/[hash].[ext]',
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@styles': path.resolve(__dirname, 'src/styles'),
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
        filename: 'src/styles/[name].[contenthash].css',
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
