/**
 * @Author: Zhengfeng.Yao <yzf>
 * @Date:   2017-08-07 14:25:53
 * @Last modified by:   yzf
 * @Last modified time: 2017-08-07 14:25:54
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, browserHistory, match } from 'react-router';
import 'whatwg-fetch';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
require('./polyfill');

const MOUNT_NODE = document.getElementById('app');

let render = () => {
  const configureStore = require('./configureStore').default;
  const stores = configureStore(window.__INIT_STATE__);
  const history = syncHistoryWithStore(browserHistory, stores.routing);
  const routes = require('./routes').default;
  match({ routes, location: window.location.pathname }, (err, redirectLocation, props) => {
    if (redirectLocation) {
      window.location.replace(redirectLocation.pathname + redirectLocation.search);
    }
    if (props) {
      if (__DEV__) {
        Object.assign(window, { ...stores });
      }
      ReactDOM.render(
        <Provider {...stores}>
          <Router history={history} {...props} />
        </Provider>,
        MOUNT_NODE
      );
    }
  });
};

try {
  render();
} catch(e) {
  console.log(e);
}

if (__DEV__) {
  const enableLogging = require('mobx-logger').default;
	enableLogging({
    predicate: () => true,
    action: true,
    reaction: true,
    transaction: true,
    compute: true
	});
  if (module.hot) {
    module.hot.accept(['./routes', './configureStore'], ()  => {
      setTimeout(() => {
        const queryString = '?reload=' + new Date().getTime();
        $('link[href*="assets"]').each(function() {
          this.href = this.href.replace(/\?.*|$/, queryString);
        });
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}
