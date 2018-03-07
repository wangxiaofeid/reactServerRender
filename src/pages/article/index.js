import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('articleStore')
@observer
export default class Article extends React.Component {
  constructor(props) {
    super(props);
    props.articleStore.init();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        Article
        <br />
        url参数：{this.props.params.id}
        <br />
        接口返回： {this.props.articleStore.xx}
      </div>
    );
  }
}
