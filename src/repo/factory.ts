import memoryFactory from '@js-entity-repos/memory/dist/factory';
import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default ({ getState, patchState }: FactoryConfig): Facade => {
  const todosFacade = memoryFactory({
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
    setNewTodoTitle: (title) => {
      patchState({ newTodoTitle: title });
    },
    setRoute: (route) => {
      patchState({ route });
    },
    todos: todosFacade,
  };
};
