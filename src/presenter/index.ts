import * as dom from 'react-dom';
import app from './app';

const element = document.getElementsByClassName('todoapp')[0];
dom.render(app(), element);
