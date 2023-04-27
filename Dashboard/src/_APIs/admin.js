import axios from 'axios';
const host_adr = '192.168.29.178';

export const API_Login = axios.create({
  baseURL: `http://${host_adr}:9001/API/admin/login`,
});

export const API_Init = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/admin/init`,
    headers: { 'access-token-key': TOKEN }
  });
};