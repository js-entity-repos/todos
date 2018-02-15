import * as React from 'react';

const loader = () => {
  return <span>Loading</span>;
};

// tslint:disable:no-class no-this
const asyncRender = <P, C>(component: (props: P) => Promise<C>) => (props: P): C => {
  class AsyncWrapper extends React.Component<any, any> {
    constructor(p: any, s: any) {
      super(p, s);
      const renderedComponent = loader();
      this.state = { renderedComponent };
    }

    public async componentDidMount() {
      const renderedComponent = await component(props);
      this.setState({ renderedComponent });
    }

    public render() {
      return this.state.renderedComponent;
    }
  }

  return <AsyncWrapper /> as any as C;
};

export default asyncRender;
