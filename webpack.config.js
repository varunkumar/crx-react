import { Buffer } from 'node:buffer';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import fsExtra from 'fs-extra';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { NODE_ENV } from './utils/env.js';

const { EnvironmentPlugin, ProgressPlugin } = webpack;
const { existsSync } = fsExtra;

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

const ASSET_PATH = process.env.ASSET_PATH || '/';
const alias = {};

// load the secrets
const secretsPath = join(DIR_NAME, `secrets.${NODE_ENV}.js`);

const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const isDevelopment = NODE_ENV !== 'production';

const options = {
  mode: NODE_ENV,
  entry: {
    newtab: join(DIR_NAME, 'src', 'pages', 'Newtab', 'index.jsx'),
    options: join(DIR_NAME, 'src', 'pages', 'Options', 'index.tsx'),
    popup: join(DIR_NAME, 'src', 'pages', 'Popup', 'index.jsx'),
    background: join(DIR_NAME, 'src', 'pages', 'Background', 'index.js'),
    contentScript: join(DIR_NAME, 'src', 'pages', 'Content', 'index.js'),
    devtools: join(DIR_NAME, 'src', 'pages', 'Devtools', 'index.js'),
    panel: join(DIR_NAME, 'src', 'pages', 'Panel', 'index.jsx'),
  },
  customConfig: {
    notHotReload: ['background', 'contentScript', 'devtools'],
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(DIR_NAME, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp(`.(${fileExtensions.join('|')})$`),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias,
    extensions: fileExtensions
      .map((extension) => `.${extension}`)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: false }),
    new ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: join(DIR_NAME, 'build'),
          force: true,
          transform(content) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              }),
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/pages/Content/content.styles.css',
          to: join(DIR_NAME, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-128.png',
          to: join(DIR_NAME, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-34.png',
          to: join(DIR_NAME, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: join(DIR_NAME, 'src', 'pages', 'Newtab', 'index.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(DIR_NAME, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(DIR_NAME, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(DIR_NAME, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: join(DIR_NAME, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false,
    }),
  ],
  infrastructureLogging: {
    level: 'info',
  },
};

if (isDevelopment) {
  options.devtool = 'cheap-module-source-map';
  options.plugins.push(new ReactRefreshWebpackPlugin());
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

export default options;
