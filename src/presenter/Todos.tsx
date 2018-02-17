import * as React from 'react';
import Service from '../service/Facade';
import Footer from './Footer';
import NewTodo from './NewTodo';
import TodoItems from './TodoItems';

export interface Props {
  readonly service: Service;
}

export default ({ service }: Props) => {
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <NewTodo service={service} />
      </header>
      <section className="main">
        <TodoItems service={service} />
      </section>
      <Footer service={service} />
    </div>
  );
};
