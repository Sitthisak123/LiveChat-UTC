import axios from 'axios';
const host_adr = 'localhost';

export const API_Login = axios.create({
  baseURL: `http://${host_adr}:9001/API/admin/login`,
});

export const API_Init = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/admin/init`,
    headers: { 'access-token-key': TOKEN }
  });
};