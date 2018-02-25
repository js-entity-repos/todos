import { EventEmitter } from 'events';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import Service from '../../service/Facade';

export interface Props {
  readonly service: Service;
  readonly observer: EventEmitter;
  readonly render: () => JSX.Element;
}

// tslint:disable:no-class no-this
export default class ConnectProvider extends React.Component<Props> {
  public static readonly childContextTypes = {
    observer: PropTypes.any.isRequired,
    service: PropTypes.any.isRequired,
  };

  public getChildContext() {
    const service = this.props.service;
    const observer = this.props.observer;
    return { service, observer };
  }

  public render() {
    return this.props.render();
  }
}
