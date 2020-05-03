import React, {
  useCallback,
  useEffect,
  useReducer
} from "react";

import {
  unstable_trace as trace
} from 'scheduler/tracing';

import axios from "axios";

import {
  useDocumentTitle,
  useMode,
  useMemoMode,
  useAsyncMode
} from "./hooks";

import TodoForm from "./TodoForm";
import Todo from "./Todo";

import todosReducer from "./todosReducer";

import styles from "./App.module.css";

// ...

function App() {
  const [todos, dispatch] = useReducer(todosReducer, null);

  useDocumentTitle(
    todos
      ? `Todos (${todos.reduce(
        (count, todo) => (!todo.completed ? ++count : count),
        0
      )})`
      : ''
  );

  // get the mode (= most frequently used word) in the set of all todo titles.
  const titles = (todos || []).map(({ title }) => title);
  
  // ...
  // Uncomment a hook below to profile its performance.
  const mfw = useMode(titles);
  // const mfw = useMemoMode(titles);
  // const mfw = useAsyncMode(titles);
  
  console.log('Mode: ' + (mfw ?? 'N/A'));

  const createTodo = title => {
    trace('CREATE_TODO', performance.now(), () => {
      dispatch({
        type: "CREATE_TODO",
        title,
      });
    });
  };

  const deleteTodo = useCallback((todoId) => {
    dispatch({
      type: "DELETE_TODO",
      todoId,
    });
  }, []);

  const updateTodo = useCallback((todoId) => {
    dispatch({
      type: "UPDATE_TODO",
      todoId,
    });
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await axios("http://jsonplaceholder.typicode.com/todos");

      dispatch({
        type: "FETCH_TODOS",
        todos: result.data,
      });
    };

    fetchTodos();
  }, []);

  return (
    <div className={styles.app}>
      <TodoForm createTodo={createTodo} />

      {todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            {...todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
}

export default App;
