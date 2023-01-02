import webpack from 'webpack'; // eslint-disable-line
import config from '../webpack.config.js'; // eslint-disable-line

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

delete config.customConfig;

config.mode = 'production';

webpack(config, (err) => {
  if (err) throw err;
});
