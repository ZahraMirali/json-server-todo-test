import { ReactElement, useState } from 'react';
import styles from './TodoInput.module.css';
import { addTodo } from '../../store/todoSlice';
import { useAppDispatch } from '../../store/hooks';

export default function TodoInput(): ReactElement {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>('');

  const onAddClick = () => {
    if (!title) {
      alert('ToDo title is required');
    } else {
      fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })
        .then((response) => response.json())
        .then((data) => {
          setTitle('');
          dispatch(addTodo(data));
        })
        .catch((err) => console.log('err', err));
    }
  };

  return (
    <input
      className={styles.input}
      value={title}
      onChange={({ target: { value } }) => setTitle(value)}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          onAddClick();
        }
      }}
      placeholder='What needs to be done?'
    />
  );
}
