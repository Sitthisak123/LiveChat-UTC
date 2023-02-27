import axios from 'axios';
const host_adr = 'localhost';
export const API_Login = axios.create({
  baseURL: `http://${host_adr}:9001/API/user/login`
});

export const API_Register = axios.create({
  baseURL: `http://${host_adr}:9001/API/user/register`
});
export const API_Init = axios.create({
  baseURL: `http://${host_adr}:9001/API/user/init`
});
export const API_getImage = axios.create({
  baseURL: `http://${host_adr}:9001/API/user/getImage/`
});
