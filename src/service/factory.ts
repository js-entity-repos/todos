import Sort from '@js-entity-repos/core/dist/types/Sort';
import { desc } from '@js-entity-repos/core/dist/types/SortOrder';
import repoFactory from '../repo/factory';
import TodoEntity from '../utils/TodoEntity';

export interface FactoryConfig {
  readonly repo: ReturnType<typeof repoFactory>;
}

export default ({ repo }: FactoryConfig) => {
  return {
    changeNewTodoTitle: (title: string) => {
      repo.setNewTodoTitle(title);
    },
    createNewTodo: async () => {
      const seed = 100;
      const id = (Math.random() * seed).toString();
      const title = repo.getNewTodoTitle();
      const completed = false;
      const createdAt = new Date();
      await repo.todos.createEntity({
        entity: { completed, id, title, createdAt },
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
    getEditedTitle: (id: string) => {
      return repo.getEditedTitle(id);
    },
    getIncompleteCount: async () => {
      return (await repo.todos.countEntities({
        filter: { completed: false },
      })).count;
    },
    getIsEditing: (id: string) => {
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
      const sort: Sort<TodoEntity> = { createdAt: desc };
      if (route === 'active') {
        return (await repo.todos.getEntities({ sort, filter: { completed: false } })).entities;
      }
      if (route === 'completed') {
        return (await repo.todos.getEntities({ sort, filter: { completed: true } })).entities;
      }
      return (await repo.todos.getEntities({ sort })).entities;
    },
    removeTodo: async (id: string) => {
      await repo.todos.removeEntity({ id });
    },
    setEditedTitle: (id: string, title: string) => {
      repo.setEditedTitle(id, title);
    },
    setIsEditing: (id: string, isEditing: boolean) => {
      repo.setIsEditing(id, isEditing);
    },
    setRoute: (route: string) => {
      repo.setRoute(route);
    },
    setTodoCompletion: async (id: string, completed: boolean) => {
      await repo.todos.patchEntity({ id, patch: { completed } });
    },
    setTodoTitle: async (id: string, title: string) => {
      await repo.todos.patchEntity({ id, patch: { id, title } });
    },
  };
};
