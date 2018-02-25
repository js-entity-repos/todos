import repoFactory from '../repo/factory';
import serviceFactory from '../service/factory';
import observer from '../utils/observer';
import AppConfig from './AppConfig';
import factory from './factory';

export default (config: AppConfig) => {
  const repo = repoFactory(config.repo);
  const service = serviceFactory({ repo });
  const presenter = factory({ service, observer });

  window.addEventListener('hashchange', () => {
    const route = location.hash.split('#').slice(1).join('#');
    service.setRoute(route);
  }, false);

  return presenter;
};
