import axios from 'axios';


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.default.timeout = 5000;

async function getTasks() {
  await delay(5000);
  const response = await axios.get('/tasks').catch(err => {
        console.error(' --- Error fetching data: ' + err);
      });
  return response.data;
}

async function createTask(task) {  
  //await delay(5_000);
  const response = await axios.post('/tasks', task).catch(err => {
        console.error(' --- Error creating task: ' + err);
      });
  return response.data;
}

async function deleteTask(taskId) {  
  //await delay(5_000);
  const response = await axios.delete(`/tasks/${taskId}`).catch(err => {
        console.error(' --- Error deleting task: ' + err);
      });
  return response.data;
}

async function updateTask(taskId, data) {
  //await delay(5_000);
  const response = await axios.patch(`/tasks/${taskId}`, data).catch(err => {
    console.error(' --- Error updating task: ' + err);
  });
  return response.data;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setupInterceptors(setLoading) {
  const requestInterceptor = axios.interceptors.request.use(config => {
    setLoading(true);
    return config;
  });

  const responseInterceptor = axios.interceptors.response.use(
    response => {
      setLoading(false);
      return response;
    },
    error => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
  };
}

export { getTasks, createTask, deleteTask, updateTask, setupInterceptors };
