require('@babel/register')({
  ignore: [/\/build\//, /\/node_modules(?![\\/](react-echarts-v3|antd|rc-.+)[\\/])/],
  presets: ['@babel/env', 'react-app'],
  plugins: [
    'macros',
    'transform-decorators-legacy',
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node-babel-7',
    'react-loadable/babel',
    [
      'babel-plugin-styled-components',
      {
        ssr: true,
      },
    ],
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-optional-chaining',
    'closure-elimination',
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-react-constant-elements',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    'lodash',
  ],
});

const fetch = require('node-fetch');
const fs = require('fs-extra');
const path = require('path');

const { GRAPHQL_API } = require('../src/API.config');

fetch(`${GRAPHQL_API}/graphql`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null);
    result.data.__schema.types = filteredData;
    const filepath = path.join(process.cwd(), './src/generated/fragmentTypes.json');
    fs.ensureFileSync(filepath);
    fs.writeFile(filepath, JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  })
  .catch(console.error);
