/* eslint-disable no-restricted-syntax */
// Do this as the first thing so that any code reading it knows the right env.
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack'; // eslint-disable-line
import WebpackDevServer from 'webpack-dev-server'; // eslint-disable-line
import config from '../webpack.config.js'; // eslint-disable-line
import { PORT } from './env.js';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

const { customConfig, entry } = config;

const FILE_NAME = fileURLToPath(import.meta.url);
const DIR_NAME = dirname(FILE_NAME);

const options = customConfig || {};
const excludeEntriesToHotReload = options.notHotReload || [];

for (const entryName in entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${PORT}`,
    ].concat(entry[entryName]);
  }
}

delete config.customConfig;

const compiler = webpack(config);

const server = new WebpackDevServer(
  {
    https: false,
    hot: 'only',
    liveReload: false,
    client: false,
    host: 'localhost',
    port: PORT,
    static: {
      directory: join(DIR_NAME, '../build'),
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
  compiler,
);

if (process.env.NODE_ENV === 'development' && import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

(async () => {
  await server.start();
})();
