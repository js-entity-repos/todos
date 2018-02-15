import * as React from 'react';
import observer from '../../utils/observer';

// tslint:disable:no-class no-this prefer-function-over-method
const connect = <P, C>(component: (props: P) => C) => (props: P): C => {
  class ConnectWrapper extends React.Component<any, any> {
    public componentDidMount() {
      observer.addListener('change', this.update.bind(this));
    }

    public componentWillUnmount() {
      observer.removeListener('change', this.update.bind(this));
    }

    private update() {
      this.setState({ change: new Date() });
    }

    public render() {
      return component(props);
    }
  }

  return <ConnectWrapper /> as any as C;
};

export default connect;
