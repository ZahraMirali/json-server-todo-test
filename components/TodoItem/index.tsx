import { ReactElement, useState } from 'react';
import styles from './TodoItem.module.css';
import { EditCompleted, EditTitle, TodoItemProps } from '../../types/Todo';

export default function TodoItem({
  style,
  data,
  onEditSuccess,
  onDeleteSuccess,
}: TodoItemProps): ReactElement {
  const [title, setTitle] = useState<string>(data.title);
  const [readOnly, setReadOnly] = useState(true);

  const onEditTodo = (values: EditTitle | EditCompleted) => {
    fetch(`http://localhost:3001/todos/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => onEditSuccess(data))
      .catch((err) => console.log('err', err));
  };

  const onDeleteClick = () => {
    fetch(`http://localhost:3001/todos/${data.id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        onDeleteSuccess(data.id);
      })
      .catch((err) => console.log('err', err));
  };

  const onEditTitleSubmit = () => {
    if (!title) {
      alert('ToDo title is required');
      setTitle(data.title);
    } else if (title !== data.title) {
      onEditTodo({ title });
    }
    setReadOnly(true);
  };

  return (
    <div style={style} className={styles.card}>
      <input
        type='checkbox'
        checked={data.completed}
        onChange={(e) => onEditTodo({ completed: e.target.checked })}
      />
      <input
        type='text'
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        onBlur={onEditTitleSubmit}
        onKeyDown={({ key }) => {
          if (key === 'Enter') {
            onEditTitleSubmit();
          }
        }}
        readOnly={readOnly}
        onDoubleClick={() => setReadOnly(false)}
      />
      <button onClick={onDeleteClick}>×</button>
    </div>
  );
}
