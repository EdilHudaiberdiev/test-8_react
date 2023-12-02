import axios from 'axios';

const axiosApi = axios.create ({
  baseURL: 'https://test-8-react-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;