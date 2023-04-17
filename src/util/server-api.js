import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://192.168.138.64:8080/',
  responseType: 'json',
  withCredentials: true,
});

serverApi.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error.message);
})

export default serverApi;