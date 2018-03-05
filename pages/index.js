import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import fetch from "isomorphic-unfetch";
import { Button } from "antd";
import { Layout } from "../components";
import Link from "next/link";
import Router from 'next/router';

export default class Home extends Component {
    static async getInitialProps() {
        const res = await fetch('http://localhost:3000/get/test')
        const json = await res.json()
        return { stars: json }
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        // const { isLoadList } = this.props.homeStore;
        return (
            <Layout {...this.props}>
                <div className="clearfix">
                    后台读取的数据{this.props.stars.xx}
                    <br />
                    store数据 <Demo />
                    <br />
                    跳转到详情页 <Link href='/article/xxx'><a>article</a></Link>
                    <br />
                    通过Router跳转 <a href='#' onClick={e => {
                        e.preventDefault()
                        Router.push('/article/xxx')
                    }}>article</a>
                </div>
            </Layout>
        )
    }
}

@inject('store')
@observer
class Demo extends Component {
    render () {
        return <div>
                <Button onClick={() => this.props.store.start()}>{this.props.store.num}</Button>
            </div>
    }
}