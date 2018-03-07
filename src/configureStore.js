import { RouterStore } from 'mobx-react-router';
import AppStore from './stores';

export default function configureStore(initState = {}) {
  const routingStore = new RouterStore();
  const appStore = new AppStore(initState);
  const { homeStore, articleStore } = appStore;
  const stores = {
    routing: routingStore,
    appStore,
    homeStore,
    articleStore
  }
  return stores;
}
