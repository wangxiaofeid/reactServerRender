const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const Config = require('tdtool').Config;
const TARGET = process.env.npm_lifecycle_event;
const isDebug = TARGET.indexOf('release') == -1;
const config = require('./config.json');
const release = isDebug ? config.dev : config.release;

const clientConfig = new Config({
  entry: {
    [pkg.name]: './src/client',
    vendor1: ['react', 'react-dom', 'mobx', 'mobx-react', 'react-router'],
    vendor2: ['moment', 'moment/locale/zh-cn']
  },
  sourceMap: true,
  filename: '[name].js',
  minimize: !isDebug,
  externals: {
      jquery: 'window.$'
  },
  extends: [['react', {
    plugins: [
      ["import", { libraryName: "td-ui", style: true }]
    ]
  }], ['less', {
    extractCss: {
      filename: '[name].css',
      allChunks: true
    }
  }]],
  env: {
    'process.env.NODE_ENV': isDebug ? '"development"': '"production"',
    __DEV__: isDebug,
    'process.env.BROWSER': true
  }
});

clientConfig.add(
  'plugin.Common',
  new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor2', 'vendor1', 'minifest'],
      filename: '[name].js',
  })
);

const AssetsPlugin = require('assets-webpack-plugin');
clientConfig.add(
  'plugin.AssetsPlugin',
  new AssetsPlugin({
    path: isDebug ? './dist' : './build/server',
    filename: 'assets.json',
    prettyPrint: true,
  })
);

if (!isDebug) {
  clientConfig.add('output.path', path.join(release, 'client'));
  clientConfig.add('output.publicPath', '/');
  clientConfig.add('output.chunkFilename', '[name].chunk.js');

  // module.exports = clientConfig.resolve();
} else {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  clientConfig.add(
    'plugin.BundleAnalyzerPlugin',
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 4875,
      reportFilename: 'report.html',
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'analyseStats.json',
      statsOptions: null,
      logLevel: 'info',
    })
  );
}

const serverConfig = new Config({
  entry: './src/server',
  target: 'node',
  filename: 'server.js',
  sourceMap: true,
  devServer: true,
  externals: [/^\.\/assets\.json$/],
  extends: [['react', {
    plugins: [
      ["import", { libraryName: "td-ui", style: true }]
    ]
  }], ['less', {
    target: 'node'
  }]],
  env: {
    __DEV__: isDebug,
    'process.env.BROWSER': false
  }
});

if (!isDebug) {
  serverConfig.add('output.path', path.join(release, 'server'));
}

module.exports = [clientConfig.resolve(), serverConfig.resolve()];
