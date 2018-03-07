import App from '../app';

const routes = [{
  path: '/',
  key: 'renderServer',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: [{
    path: 'home',
    key: 'home',
    chunk: 'home',
    getComponent: (nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../pages/home').default)
      }, 'home')
    },
    title: '首页',
    onEnter: nextState => {
      if (process.env.BROWSER) {
        const route = nextState.routes.find(item => !!item.title);
        document.title = route.title;
      }
    }
  }, {
    path: 'article/:id',
    key: 'article',
    chunk: 'article',
    getComponent: (nextState, cb) => {
      require.ensure([], (require) => {
        cb(null, require('../pages/article').default)
      }, 'article')
    },
    title: '详情页',
    onEnter: nextState => {
      if (process.env.BROWSER) {
        const route = nextState.routes.find(item => !!item.title);
        document.title = route.title;
      }
    }
  }]
}];

export default routes;
