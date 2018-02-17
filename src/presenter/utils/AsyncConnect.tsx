import * as React from 'react';
import Service from '../../service/Facade';
import observer from '../../utils/observer';

const loader = () => {
  return <span>Loading</span>;
};

export interface Props {
  readonly service: Service;
  readonly render: () => Promise<JSX.Element>;
}

export interface State {
  readonly renderedComponent: JSX.Element;
}

// tslint:disable:no-class no-this
export default class AsyncConnect extends React.Component<Props, State> {
  constructor(p: Props, s: State) {
    super(p, s);
    const renderedComponent = loader();
    this.state = { renderedComponent };
  }

  public componentDidMount() {
    observer.addListener('change', this.update.bind(this));
    this.update().catch((err) => {
      // tslint:disable-next-line:no-console
      console.error(err);
    });
  }

  public componentWillUnmount() {
    observer.removeListener('change', this.update.bind(this));
  }

  private async update() {
    const renderedComponent = await this.props.render();
    this.setState({ renderedComponent });
  }

  public render() {
    return this.state.renderedComponent;
  }
}
