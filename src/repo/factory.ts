import Facade from '@js-entity-repos/core/dist/Facade';
import memoryFactory from '@js-entity-repos/memory/dist/factory';
import TodoEntity from '../utils/TodoEntity';

export interface FactoryConfig {
  readonly emitChange: () => void;
}

export default ({ emitChange }: FactoryConfig) => {
  const initialState = {
    editedTitles: {} as { readonly [id: string]: string },
    isEditing: {} as { readonly [id: string]: boolean },
    newTodoTitle: '' as string,
    route: '' as string,
    todos: [] as TodoEntity[],
  };

  const getState = (): typeof initialState => {
    const localStorageState = window.localStorage.getItem('state');
    if (localStorageState === null) {
      return initialState;
    }
    return JSON.parse(localStorageState);
  };

  const patchState = (patch: Partial<typeof initialState>) => {
    const prevState = getState();
    const nextState = { ...prevState, ...patch };
    // tslint:disable-next-line:no-console
    console.log('PATCH STATE', patch);
    window.localStorage.setItem('state', JSON.stringify(nextState));
    emitChange();
  };

  const todosFacade: Facade<TodoEntity> = memoryFactory({
    defaultPaginationLimit: 100,
    entityName: 'Todo',
    getEntities: () => getState().todos,
    setEntities: (todos) => { patchState({ todos }); },
  });

  return {
    getEditedTitle: (id: string) => getState().editedTitles[id],
    getIsEditing: (id: string) => getState().isEditing[id],
    getNewTodoTitle: () => getState().newTodoTitle,
    getRoute: () => getState().route,
    setEditedTitle: (id: string, title: string) => {
      patchState({
        editedTitles: { ...getState().editedTitles, [id]: title },
      });
    },
    setIsEditing: (id: string, isEditing: boolean) => {
      patchState({
        isEditing: { ...getState().isEditing, [id]: isEditing },
      });
    },
    setNewTodoTitle: (title: string) => {
      patchState({ newTodoTitle: title });
    },
    setRoute: (route: string) => {
      patchState({ route });
    },
    todos: todosFacade,
  };
};
