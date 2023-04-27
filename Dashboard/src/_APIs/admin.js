import axios from 'axios';
const host_adr = process.env.REACT_APP_API;

export const API_Login = axios.create({
  baseURL: `http://${host_adr}/API/admin/login`,
});

export const API_Init = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/admin/init`,
    headers: { 'access-token-key': TOKEN }
  });
};