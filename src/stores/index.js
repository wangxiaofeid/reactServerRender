import HomeStore from "./homeStore";
import ArticleStore from "./articleStore";

export default class AppStore {
  constructor(initState) {
    const { homeStore, articleStore } = initState;
    this.menus = [{
      displayName: '首页',
      url: '/home'
    }, {
      displayName: '详情页',
      url: '/article/1111'
    }];

    this.homeStore = new HomeStore(homeStore, this);
    this.articleStore = new ArticleStore(articleStore, this);
  }
}
