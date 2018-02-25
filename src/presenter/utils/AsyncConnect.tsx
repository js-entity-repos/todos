import * as PropTypes from 'prop-types';
import * as React from 'react';
import Service from '../../service/Facade';

const loader = () => {
  return <span>Loading</span>;
};

export interface ChildProps {
  readonly service: Service;
}

export interface Props {
  readonly render: (props: ChildProps) => Promise<JSX.Element>;
}

export interface State {
  readonly renderedComponent: JSX.Element;
}

// tslint:disable:no-class no-this
export default class AsyncConnect extends React.Component<Props, State> {
  public static readonly contextTypes = {
    observer: PropTypes.any.isRequired,
    service: PropTypes.any.isRequired,
  };

  constructor(p: Props, c: any) {
    super(p, c);
    const renderedComponent = loader();
    this.state = { renderedComponent };
  }

  public componentDidMount() {
    this.context.observer.addListener('change', this.update.bind(this));
    this.update().catch((err) => {
      // tslint:disable-next-line:no-console
      console.error(err);
    });
  }

  public componentWillUnmount() {
    this.context.observer.removeListener('change', this.update.bind(this));
  }

  private async update() {
    const service = this.context.service;
    const renderedComponent = await this.props.render({ service });
    this.setState({ renderedComponent });
  }

  public render() {
    return this.state.renderedComponent;
  }
}
