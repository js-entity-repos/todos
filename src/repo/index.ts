import observer from '../utils/observer';
import Facade from './Facade';
import factory from './factory';
import { State } from './FactoryConfig';

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

export default factory({ getState, patchState }) as Facade;
