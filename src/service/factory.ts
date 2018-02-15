import Facade from './Facade';
import FactoryConfig from './FactoryConfig';

export default ({ repo }: FactoryConfig): Facade => {
  return {
    changeNewTodoTitle: (title) => {
      repo.setNewTodoTitle(title);
    },
    createNewTodo: async () => {
      const seed = 100;
      const id = (Math.random() * seed).toString();
      const title = repo.getNewTodoTitle();
      const completed = false;
      await repo.todos.createEntity({
        entity: { completed, id, title },
        id,
      });
    },
    deleteCompleted: async () => {
      return repo.todos.removeEntities({
        filter: { completed: true },
      });
    },
    getCompleteCount: async () => {
      return (await repo.todos.countEntities({
        filter: { completed: true },
      })).count;
    },
    getEditedTitle: (id) => {
      return repo.getEditedTitle(id);
    },
    getIncompleteCount: async () => {
      return (await repo.todos.countEntities({
        filter: { completed: false },
      })).count;
    },
    getIsEditing: (id) => {
      return repo.getIsEditing(id);
    },
    getNewTodoTitle: () => {
      return repo.getNewTodoTitle();
    },
    getRoute: () => {
      return repo.getRoute();
    },
    getRouteTodos: async () => {
      const route = repo.getRoute();
      if (route === 'active') {
        return (await repo.todos.getEntities({ filter: { completed: false } })).entities;
      }
      if (route === 'completed') {
        return (await repo.todos.getEntities({ filter: { completed: true } })).entities;
      }
      return (await repo.todos.getEntities({})).entities;
    },
    removeTodo: async (id) => {
      await repo.todos.removeEntity({ id });
    },
    setEditedTitle: (id, title) => {
      repo.setEditedTitle(id, title);
    },
    setIsEditing: (id, isEditing) => {
      repo.setIsEditing(id, isEditing);
    },
    setRoute: async (route) => {
      repo.setRoute(route);
    },
    setTodoCompletion: async (id, completed) => {
      await repo.todos.patchEntity({ id, patch: { completed } });
    },
    setTodoTitle: async (id, title) => {
      await repo.todos.patchEntity({ id, patch: { id, title } });
    },
  };
};
