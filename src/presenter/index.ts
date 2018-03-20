import * as dom from 'react-dom';
import app from './app';

dom.render(
  app(),
  document.getElementsByClassName('todoapp')[0],
);
