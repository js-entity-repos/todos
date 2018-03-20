import { EventEmitter } from 'events';
import factory from '../presenter/factory';
import repoFactory from '../repo/factory';
import serviceFactory from '../service/factory';

export default () => {
  const observer = new EventEmitter();
  const emitChange = () => observer.emit('change');
  const repo = repoFactory({ emitChange });
  const service = serviceFactory({ repo });
  const presenter = factory({ service, observer });

  window.addEventListener('hashchange', () => {
    const route = location.hash.split('#').slice(1).join('#');
    service.setRoute(route);
  }, false);

  return presenter;
};
