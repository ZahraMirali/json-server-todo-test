import { ReactElement, useState } from 'react';
import { TodoListProps } from '../../types/Todo';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.css';
import TodoInput from '../TodoInput';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function TodoList({ data }: TodoListProps): ReactElement {
  const {
    query: { type },
  } = useRouter();
  const [todos, setTodos] = useState(data);
  const activeTodos = todos.filter((item) => !item.completed);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <TodoInput onSuccess={(data) => setTodos((prev) => [...prev, data])} />
        {todos.length === 0 ? (
          <p>Create your first To Do</p>
        ) : (
          <div className={styles.listContainer}>
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList
                  itemCount={
                    type === 'active' ? activeTodos.length : todos.length
                  }
                  itemSize={60}
                  width={width}
                  height={height}
                >
                  {(props) => (
                    <TodoItem
                      {...props}
                      data={
                        type === 'active'
                          ? activeTodos[props.index]
                          : todos[props.index]
                      }
                      onEditSuccess={(data) => {
                        setTodos((prev) => {
                          const index = prev.findIndex(
                            (item) => item.id === data.id
                          );
                          return [
                            ...prev.slice(0, index),
                            data,
                            ...prev.slice(index + 1),
                          ];
                        });
                      }}
                      onDeleteSuccess={(id: number) => {
                        setTodos((prev) =>
                          prev.filter((item) => item.id !== id)
                        );
                      }}
                    />
                  )}
                </FixedSizeList>
              )}
            </AutoSizer>
          </div>
        )}
      </div>
      <div className={styles.cardFooter}>
        <p>
          <strong>{activeTodos.length}</strong> items left
        </p>
        <div>
          <Link href='/all'>
            <a>{type !== 'active' ? <strong>All</strong> : 'All'}</a>
          </Link>
          <Link href='/active'>
            <a>{type === 'active' ? <strong>Active</strong> : 'Active'}</a>
          </Link>
        </div>
        <button disabled>Clear completed</button>
      </div>
    </div>
  );
}
