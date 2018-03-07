import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames';
import { Link } from "./components";

@inject('appStore')
@observer
export default class Menus extends Component {
  render() {
    const { menus } = this.props.appStore;
    return (
      <div className="sidebar2-func">
        <ul>
          {
            menus.map((menu, i) => (
              <li
                key={i}
              >
                <Link
                  to={menu.url}
                >
                  {menu.displayName}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
