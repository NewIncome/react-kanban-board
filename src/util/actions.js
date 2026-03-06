import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.default.timeout = 5000;

async function getTasks() {
  try {
    const response = await axios.get('/tasks');
    return response.data;
  } catch (err) {
    console.error(' --- Error fetching data: ' + err);
    return [];
  }
}

async function createTask(task) {  
  try {
    const response = await axios.post('/tasks', task);
    return response.data;
  } catch (err) {
    console.error(' --- Error creating task: ' + err);
    return null;
  }
}

async function deleteTask(taskId) {
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (err) {
    console.error(' --- Error deleting task: ' + err);
    return null;
  }
}

async function updateTask(taskId, data) {
  try {
    const response = await axios.patch(`/tasks/${taskId}`, data);
    return response.data;
  } catch (err) {
    console.error(' --- Error updating task: ' + err);
    return null;
  }
}


export { getTasks, createTask, deleteTask, updateTask };
