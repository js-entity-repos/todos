import Entity from '@js-entity-repos/core/dist/types/Entity';

export default interface TodoEntity extends Entity {
  readonly title: string;
  readonly completed: boolean;
  readonly createdAt: Date;
}
