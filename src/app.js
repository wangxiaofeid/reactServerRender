import './styles';
import React, { Component } from 'react';
import Menus from './menus';

export default class App extends Component {
  render() {
    return (
      <div className="main">
        <Menus />
        {
          this.props.children
        }
      </div>
    )
  }
}
