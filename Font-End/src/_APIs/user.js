import axios from 'axios';

export const API_Login = axios.create({
  baseURL: 'http://localhost:9001/API/user/login'
});

export const API_Register = axios.create({
  baseURL: 'http://localhost:9001/API/user/register'
});
export const API_Conversation = axios.create({
  baseURL: 'http://localhost:9001/API/user/conversation'
});
