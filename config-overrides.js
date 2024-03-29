const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin('@babel/plugin-proposal-do-expressions', config);
  config = injectBabelPlugin('@babel/plugin-proposal-optional-chaining', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = injectBabelPlugin('lodash', config);
  config = injectBabelPlugin('date-fns', config);

  if (env === 'production') {
    console.log('⚡ Production build with optimization ⚡');
    config = injectBabelPlugin('closure-elimination', config);
    config = injectBabelPlugin('@babel/plugin-transform-react-inline-elements', config);
    config = injectBabelPlugin('@babel/plugin-transform-react-constant-elements', config);
  } else {
    config = injectBabelPlugin(
      [
        'flow-runtime',
        {
          assert: true,
          annotate: true,
        },
      ],
      config,
    );
  }

  // remove eslint in eslint, we only need it on VSCode
  config.module.rules.splice(1, 1);
  
  config.resolve = {
    alias: {
      'mapbox-gl$': path.join(resolveApp('node_modules'), '/mapbox-gl/dist/mapbox-gl.js'),
    },
  };
  
  config.module.rules[1].oneOf[1].include.push(path.join(resolveApp('node_modules'), 'react-echarts-v3/src'));
  config.module.rules[1].oneOf[1].exclude = /node_modules(?![\\/]react-echarts-v3[\\/]src[\\/])/;
  
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1aa2db' },
    javascriptEnabled: true,
  })(config, env);
  config.plugins.push(new StatsWebpackPlugin('stats.json', { chunkModules: true }));

  // add this untill https://github.com/facebook/create-react-app/issues/4769 is closed
  config.optimization.splitChunks.name = undefined;
  return config;
};
