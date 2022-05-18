import { ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import TodoItem from '../TodoItem';
import styles from './TodoList.module.css';
import TodoInput from '../TodoInput';
import { useAppSelector } from '../../store/hooks';
import { selectTodoList } from '../../store/todoSlice';

export default function TodoList(): ReactElement {
  const {
    query: { type },
  } = useRouter();
  const todos = useAppSelector(selectTodoList);
  const activeTodos = todos.filter((item) => !item.completed);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <TodoInput />
        {todos.length === 0 ? (
          <strong className={styles.emptyTitle}>Create your first To Do</strong>
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
