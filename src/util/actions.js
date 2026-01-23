import axios from 'axios';

//const LINK = 'https://react-kanban-board.jalfred.dev';

axios.defaults.baseURL = 'https://react-kanban-board.jalfred.dev';
axios.default.timeout = 5000;

function getTasks() {
  axios.get(link)
      .then(response =>{
        console.log(response.data);
        return data;
      })
      .catch(err => {
        console.error('Error fetching data: ' + err);
      })
}
