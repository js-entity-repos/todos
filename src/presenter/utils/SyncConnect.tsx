import * as React from 'react';
import Service from '../../service/Facade';
import observer from '../../utils/observer';

export interface Props {
  readonly service: Service;
  readonly render: () => JSX.Element;
}

export interface State {
  readonly change: Date;
}

// tslint:disable:no-class no-this
export default class Connect extends React.Component<Props, State> {
  public componentDidMount() {
    observer.addListener('change', this.update.bind(this));
  }

  public componentWillUnmount() {
    observer.removeListener('change', this.update.bind(this));
  }

  private async update() {
    this.setState({ change: new Date() });
  }

  public render() {
    return this.props.render();
  }
}
