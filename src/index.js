'use strict';

import React from 'react';

export default function createAsyncComponent({getComponent, LoaderComponent = () => null}) {
  return class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        Component: null,
        LoaderComponent,
        getComponent
      };
    }

    componentWillMount() {
      if (!this.state.Component) {
        this.state.getComponent().then((Component) => {
          this.setState({Component: Component && Component.default ? Component.default : Component});
        });
      }
    }

    render() {
      const {Component} = this.state;

      return Component ? <Component {...this.props} /> : <LoaderComponent {...this.props} />;
    }
  };
}
