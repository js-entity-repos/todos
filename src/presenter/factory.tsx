import * as React from 'react';
import FactoryConfig from './FactoryConfig';
import Footer from './Footer';
import NewTodo from './NewTodo';
import TodoItems from './TodoItems';
import ConnectProvider from './utils/ConnectProvider';

export default ({ service, observer }: FactoryConfig) => {
  return (
    <ConnectProvider service={service} observer={observer} render={() => {
      return (
        <div>
          <header className="header">
            <h1>todos</h1>
            <NewTodo />
          </header>
          <section className="main">
            <TodoItems />
          </section>
          <Footer />
        </div>
      );
    }} />
  );
};
