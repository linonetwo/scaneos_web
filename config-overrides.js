const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
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
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#1aa2db' },
  })(config, env);
  config = injectBabelPlugin('react-loadable/babel', config);

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

  config.module.rules[1].oneOf[2].include.push(path.join(resolveApp('node_modules'), 'react-echarts-v3/src'))
  config.module.rules[1].oneOf[2].exclude = /node_modules(?![\\/]react-echarts-v3[\\/]src[\\/])/;

  return config;
};
