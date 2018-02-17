import * as React from 'react';
import * as dom from 'react-dom';
import { State } from '../repo/FactoryConfig';
import observer from '../utils/observer';
import App from './App';

const initialState: State = {
  editedTitles: {},
  isEditing: {},
  newTodoTitle: '',
  route: '',
  todos: [],
};

const getState = (): State => {
  const localStorageState = window.localStorage.getItem('state');
  if (localStorageState === null) {
    return initialState;
  }
  return JSON.parse(localStorageState);
};

const patchState = (patch: Partial<State>) => {
  const prevState = getState();
  const nextState = { ...prevState, ...patch };
  // tslint:disable-next-line:no-console
  console.log('PATCH STATE', patch);
  window.localStorage.setItem('state', JSON.stringify(nextState));
  observer.emit('change', patch);
};

dom.render(
  <App repo={{ getState, patchState }} />,
  document.getElementsByClassName('todoapp')[0],
);
