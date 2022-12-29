/* global process:false */
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config.js';
import { PORT } from './env.js';
let { chromeExtensionBoilerplate, entry } = config;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var options = chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${PORT}`,
    ].concat(entry[entryName]);
  }
}

delete config.chromeExtensionBoilerplate;

var compiler = webpack(config);

var server = new WebpackDevServer(
  {
    https: false,
    hot: 'only',
    liveReload: false,
    client: false,
    host: 'localhost',
    port: PORT,
    static: {
      directory: join(__dirname, '../build'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
  },
  compiler
);

if (process.env.NODE_ENV === 'development' && import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

(async () => {
  await server.start();
})();
