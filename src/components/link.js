import React, { Component } from 'react';
import { Link } from 'react-router';
import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
export default class WarpLink extends Component {
    render() {
        const { to, children } = this.props;
        const { location, history } = this.props.routing;
        return <Link
            to={to}
            onClick={() => {
                this.props.routing._updateLocation(to);
                history.push(to);
            }}>
            { children }
        </Link>
    }
}
