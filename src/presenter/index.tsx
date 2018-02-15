import * as React from 'react';
import * as dom from 'react-dom';
import service from '../service/index';
import App from './App';

window.addEventListener('hashchange', () => {
  const route = location.hash.split('#').slice(1).join('#');
  service.setRoute(route);
}, false);

dom.render(
  <App service={service} />,
  document.getElementsByClassName('todoapp')[0],
);
