import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { HomeProps, Todo } from '../types/Todo';
import TodoList from '../components/TodoList';

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta
          name='description'
          content='To Do is a task management app to help you stay organized and manage your day-to-day.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Todo</h1>
        <TodoList data={data} />
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3001/todos');
  const data: Todo[] = await res.json();

  return { props: { data } };
}

export default Home;
