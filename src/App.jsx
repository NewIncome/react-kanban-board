import { useState, useEffect } from "react";
import './App.css';
import Board from "./containers/Board";
import { getTasks, setupInterceptors } from './util/actions';


function App() {
  const [tasks, setTasks] = useState([{id: "1", content: "Test Task.  Please delete me", column:"TO_DO"}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);  //to keep track of which task is currently being dragged over
  
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      
      const data = await getTasks();
      console.log(" --- Loading Tasks --- ");

      setTasks(data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // Interceptors for Loader
  useEffect(() => {
    const loadingChecker = setupInterceptors(setLoading);

    return loadingChecker;
  }, []);


  return (
    <Board
      tasks={tasks}
      setTasks={setTasks}
      loadTasks={loadTasks}
      error={error}
      draggedItem={draggedItem}
      setDraggedItem={setDraggedItem}
      loading={loading}
    />
  );
}

export default App;
