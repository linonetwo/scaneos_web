// @flow
// Express requirements
import path from 'path';
import fs from 'fs';
import type { $Request, $Response } from 'express';

// React requirements
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { Frontload, frontloadServerRender } from 'react-frontload';
import Loadable from 'react-loadable';
import { I18nextProvider } from 'react-i18next';
import 'cross-fetch/polyfill';

// Our store, entrypoint, and manifest
import createStore from '../src/store/configureStore';
import App from '../src/App';
import manifest from '../build/asset-manifest.json';
import i18n from '../src/i18n';

// LOADER
export default (req: $Request, res: $Response) => {
  /*
    A simple helper function to prepare the HTML markup. This loads:
      - Page title
      - SEO meta tags
      - Preloaded state (for Redux) depending on the current route
      - Code-split script tags depending on the current route
  */
  const injectHTML = (data, { html, title, meta, style, body, scripts, state }) => {
    data = data.replace('<html>', `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace('</head>', `${style}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`,
    );
    data = data.replace('</body>', `${scripts.join('')}</body>`);

    return data;
  };

  // Load in our HTML file from our build
  fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error('Read error', err);

      return res.status(404).end();
    }

    // Create a store (with a memory history) from our current url
    const { store } = createStore(req.url);

    const context = {};
    const modules = [];

    /*
        Here's the core funtionality of this file. We do the following in specific order (inside-out):
          1. Load the <App /> component
          2. Inside of the Frontload HOC
          3. Inside of a Redux <StaticRouter /> (since we're on the server), given a location and context to write to
          4. Inside of the store provider
          5. Inside of the React Loadable HOC to make sure we have the right scripts depending on page
          6. Render all of this sexiness
          7. Make sure that when rendering Frontload knows to get all the appropriate preloaded requests
        In English, we basically need to know what page we're dealing with, and then load all the appropriate scripts and
        data for that page. We take all that information and compute the appropriate state to send to the user. This is
        then loaded into the correct components and sent as a Promise to be handled below.
      */
    frontloadServerRender(() => {
      const sheet = new ServerStyleSheet();
      const body = renderToString(
        <Loadable.Capture report={m => modules.push(m)}>
          <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <StyleSheetManager sheet={sheet.instance}>
                <StaticRouter location={req.url} context={context}>
                  <Frontload isServer>
                    <App />
                  </Frontload>
                </StaticRouter>
              </StyleSheetManager>
            </Provider>
          </I18nextProvider>
        </Loadable.Capture>,
      );
      const style = sheet.getStyleTags();
      return { body, style };
    }).then(({ body, style }) => {
      if (context.url) {
        // If context has a url property, then we need to handle a redirection in Redux Router
        res.writeHead(302, {
          Location: context.url,
        });

        res.end();
      } else {
        // Otherwise, we carry on...

        // Let's give ourself a function to load all our page-specific JS assets for code splitting
        const extractAssets = (assets, chunks) =>
          Object.keys(assets)
            .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
            .map(k => assets[k]);

        // Let's format those assets into pretty <script> tags
        const extraChunks = extractAssets(manifest, modules).map(
          c => `<script type="text/javascript" src="/${c}"></script>`,
        );

        // We need to tell Helmet to compute the right meta tags, title, and such
        const helmet = Helmet.renderStatic();

        // NOTE: Disable if you desire
        // Let's output the title, just to see SSR is working as intended
        console.log('THE TITLE', helmet.title.toString());

        // Pass all this nonsense into our HTML formatting function above
        const html = injectHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          title: helmet.title.toString(),
          meta: helmet.meta.toString(),
          body,
          style,
          scripts: extraChunks,
          state: JSON.stringify(store.getState()).replace(/</g, '\\u003c'),
        });

        // We have all the final HTML, let's send it to the user already!
        res.send(html);
      }
    });
  });
};
