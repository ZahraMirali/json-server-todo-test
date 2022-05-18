import { ListChildComponentProps } from 'react-window';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type HomeProps = {
  data: Todo[];
};

export type TodoItemProps = ListChildComponentProps<Todo>;

export type EditCompleted = {
  completed: boolean;
};

export type EditTitle = {
  title: string;
};
