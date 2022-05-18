import { ListChildComponentProps } from 'react-window';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type HomeProps = {
  data: Todo[];
};

export type TodoListProps = {
  data: Todo[];
};

export interface TodoItemProps extends ListChildComponentProps<Todo> {
  onEditSuccess: (data: Todo) => void;
  onDeleteSuccess: (id: number) => void;
}

export type EditCompleted = {
  completed: boolean;
};

export type EditTitle = {
  title: string;
};

export type TodoInputProps = {
  onSuccess: (data: Todo) => void;
};
