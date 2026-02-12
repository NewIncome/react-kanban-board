import axios from 'axios';


axios.defaults.baseURL = 'https://kanban-board-api-a583.onrender.com/api';
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
        console.error(' --- Error deleting task: ' + err);
      });
  return response.data;
}

async function updateTask(taskId, data) {
  const response = await axios.patch(`/tasks/${taskId}`, data).catch(err => {
    console.error(' --- Error updating task: ' + err);
  });
  return response.data;
}

export { getTasks, createTask, deleteTask, updateTask };
