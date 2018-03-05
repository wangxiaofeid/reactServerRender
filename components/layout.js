import React, { Component } from 'react';
import { Provider } from "mobx-react";
import Head from 'next/head';
import { initStore } from "../store";
import "../style/index.less";

export default class Layout extends Component {
    static getInitialProps({ req }) {
        const isServer = !!req;
        return { isServer }
    }

    constructor(props) {
        super(props);
        this.store = initStore(props.isServer)
    }
    
    render() {
        return (
            <Provider store={this.store}>
                <div className="main">
                    <Head>
                        <link rel="stylesheet" type="text/css" href="https://unpkg.com/antd@3/dist/antd.min.css" />
                        <link rel="stylesheet" type="text/css" href={`/_next/static/style.css`} />
                    </Head>
                    <div className="container content">
                        {this.props.children || '空页面'}
                    </div>
                </div>
            </Provider>
        )
    }
}
