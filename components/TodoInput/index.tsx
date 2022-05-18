import { ReactElement, useState } from 'react';
import { TodoInputProps } from '../../types/Todo';
import styles from './TodoInput.module.css';

export default function TodoInput({ onSuccess }: TodoInputProps): ReactElement {
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
          onSuccess(data);
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
