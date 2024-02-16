import axios from 'axios';

const HttpService = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
  })

export default HttpService;
