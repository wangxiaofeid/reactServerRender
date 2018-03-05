import React, { Component } from 'react';
import { Layout } from "../components";
import Link from "next/link";

export default class Article extends Component {
    static getInitialProps({ query: { id } }) {
        return { id }
    }

    render() {
        return (
            <Layout {...this.props}>
                <div className="clearfix">
                    <h1>My blog post #{this.props.id}</h1>
                    <Link href='/'><a>跳转回首页</a></Link>
                </div>
            </Layout>
        )
    }
}
