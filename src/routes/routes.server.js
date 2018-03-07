import App from '../app';
import { home, article } from '../pages';

const routes = [{
  path: '/',
  key: 'renderServer',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/home') },
  childRoutes: [{
    path: 'home',
    key: 'home',
    chunk: 'home',
    component: home,
    title: '首页'
  }, {
    path: 'article/:id',
    key: 'article',
    chunk: 'article',
    component: article,
    title: '详情页'
  }]
}];

export default routes;
