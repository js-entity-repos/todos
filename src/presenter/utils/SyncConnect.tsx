import * as PropTypes from 'prop-types';
import * as React from 'react';
import Service from '../../service/Facade';

export interface ChildProps {
  readonly service: Service;
}

export interface Props {
  readonly render: (props: ChildProps) => JSX.Element;
}

// tslint:disable:no-class no-this
export default class SyncConnect extends React.Component<Props> {
  public static readonly contextTypes = {
    observer: PropTypes.any.isRequired,
    service: PropTypes.any.isRequired,
  };

  public componentDidMount() {
    this.context.observer.addListener('change', this.update.bind(this));
  }

  public componentWillUnmount() {
    this.context.observer.removeListener('change', this.update.bind(this));
  }

  private async update() {
    this.setState({});
  }

  public render() {
    const service = this.context.service;
    return this.props.render({ service });
  }
}
