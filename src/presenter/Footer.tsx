import * as React from 'react';
import AsyncConnect from './utils/AsyncConnect';

export default () => {
  return (
    <AsyncConnect render={async ({ service }) => {
      const route = service.getRoute();
      const completeCount = await service.getCompleteCount();
      const incompleteCount = await service.getIncompleteCount();

      const renderLink = (text: string, link: string) => {
        const className = route === link ? 'selected' : '';
        const href = `#${link}`;
        return <li><a href={href} className={className}>{text}</a></li>;
      };

      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{incompleteCount}</strong> items left
          </span>
          <ul className="filters">
            {renderLink('All', '')}
            {renderLink('Active', 'active')}
            {renderLink('Completed', 'completed')}
          </ul>
          {completeCount > 0 ? (
            <button
              className="clear-completed"
              onClick={async () => { await service.deleteCompleted(); }}>
              Clear completed
            </button>
          ) : <noscript />}
        </footer>
      );
    }} />
  );
};
