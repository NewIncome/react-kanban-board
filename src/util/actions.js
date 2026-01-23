import axios from 'axios';

//const LINK = 'https://react-kanban-board.jalfred.dev/api/tasks';
axios.defaults.baseURL = 'http://localhost:8080/api';
axios.default.timeout = 5000;

async function getTasks() {  
  const response = await axios.get('/tasks').catch(err => {
        console.error(' --- Error fetching data: ' + err);
      });
  return response.data;
}

async function createTask(task) {  
  const response = await axios.post('/tasks', task).catch(err => {
        console.error(' --- Error creating task: ' + err);
      });
  return response.data;
}

async function deleteTask(taskId) {  
  const response = await axios.delete(`/tasks/${taskId}`).catch(err => {
        console.error(' --- Error creating task: ' + err);
      });
  return response.data;
}

export { getTasks, createTask, deleteTask };
