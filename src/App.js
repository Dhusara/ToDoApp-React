import React, {useEffect} from 'react';
import ToDoList from './ToDoApp/ToDoList';
import Context from './context';
import Loader from './Loader';
import Modal from './Modal/modal';

const AddToDo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./ToDoApp/AddToDo'))
  }, 2000)
}));

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, []);

  function toggleToDo(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed;
        };
        return todo;
      })
    );
  };

  function removeToDo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  function addToDo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed: false,
    }]))
  };

  return (
    <Context.Provider value={{ removeToDo }}>
    <div className="wrapper">
        <h1>Your tasks: </h1>
        <Modal />

        <React.Suspense fallback={<h3>Loading...</h3>}>
          <AddToDo onCreate={addToDo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? 
          (<ToDoList todos={todos} onToggle={toggleToDo} />) : 
          (loading ? null : (<p>There are no tasks!</p>))
        }
    </div>
    </Context.Provider>
  )
};

export default App;
