import * as React from 'react';
import repoFactory from '../repo/factory';
import serviceFactory from '../service/factory';
import AppConfig from './AppConfig';
import Todos from './Todos';

export default ({ repo }: AppConfig) => {
  const repo = repoFactory(repo);
  const service = serviceFactory({ repo });
  const presenter = <Todos service={service} />;

  window.addEventListener('hashchange', () => {
    const route = location.hash.split('#').slice(1).join('#');
    service.setRoute(route);
  }, false);

  return presenter;
};
