import express from 'express';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'mobx-react';
import { toJS } from "mobx";
import { match, RouterContext } from 'react-router';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import assets from './assets.json';
import routes from './routes';
import Html from './html';
import fetch from 'node-fetch';
import configureStore from './configureStore';

global.fetch = fetch;
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan());

app.get('/get/test', (req, res) => {
  res.json({
    xx: '/get/test测试接口返回数据'
  })
})

const toJSON = store => {
  const data = toJS(store, true);
  for (let key in data) {
    if (key.includes('Store')) {
      data[key] = toJS(data[key], true);
      if (data[key].appStore) {
        delete data[key].appStore
      }
    }
  }
  return data
}

app.get('*', (req, res) => {
  match({ routes, location: req.url }, async (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      const matchRoutes = props.routes.slice();
      const route = matchRoutes.find(item => !!item.title);
      const stores = configureStore();
      if (stores[`${route.key}Store`]) {
        const pageStore = stores[`${route.key}Store`];
        await pageStore.init();
      }
      const data = {
        title: route.title,
        styles: {
          reactServerRender: assets.reactServerRender.css
        },
        scripts: {
          minifest: assets.minifest.js,
          vendor1: assets.vendor1.js,
          vendor2: assets.vendor2.js,
          reactServerRender: assets.reactServerRender.js
        },
        children: renderToString(
          <Provider {...stores}>
            <RouterContext { ...props } />
          </Provider>
        ),
        initState: toJSON(stores.appStore)
      };
      res.status(200);
      const html = renderToStaticMarkup(<Html {...data} />);
      res.send('<!doctype html>' + html);
    } else {
      res.sendStatus(404);
    }
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log('The server is running at http://localhost:' + port +'/');
});
