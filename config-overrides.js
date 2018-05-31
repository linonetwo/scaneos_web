const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin('transform-decorators-legacy', config);
  config = injectBabelPlugin('@babel/plugin-proposal-do-expressions', config);
  config = injectBabelPlugin('@babel/plugin-proposal-optional-chaining', config);
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { '@primary-color': '#443f54' },
  })(config, env);

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

  return config;
};
