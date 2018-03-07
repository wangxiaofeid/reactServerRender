import React, { Component } from 'react';

export default class Html extends Component {
  render() {
    const { title, scripts, styles, initState, children } = this.props;
    return (
      <html lang="en">
        <head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta httpEquiv="content-type" content="text/html;charset=utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          {
            Object.keys(styles).map(key => <link key={key} rel="stylesheet" type="text/css" href={styles[key]}/>)
          }
          <script dangerouslySetInnerHTML={{ __html: 'window.__INIT_STATE__ = ' + JSON.stringify(initState)}}/>
        </head>
        <body>
          <div id="content">
            <div
            id="app"
            className="container-fluid"
            dangerouslySetInnerHTML={{ __html: children }}
            />
          </div>
          {
            Object.keys(scripts).map(key => <script key={key} src={scripts[key]}></script>)
          }
        </body>
      </html>
    );
  }
}
