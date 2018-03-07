import React from 'react';
import { Button, message } from 'td-ui';
import { inject, observer } from 'mobx-react';

@inject('homeStore')
@observer
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    props.homeStore.init();
  }

  render() {
    return (
      <div>
        <Button onClick={() => { message.info('点击') }}>搜索</Button>
        <br />
        接口返回： {this.props.homeStore.xx}
      </div>
    );
  }
}
