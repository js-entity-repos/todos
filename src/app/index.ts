import * as dom from 'react-dom';
import factory from './factory';

const element = document.getElementsByClassName('todoapp')[0];
dom.render(factory(), element);
