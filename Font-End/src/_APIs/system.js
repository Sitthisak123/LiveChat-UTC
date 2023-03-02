import axios from 'axios';
const host_adr = 'localhost';
export const API_ChangeName = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}:9001/API/user/update/name`,
      headers: { 'access-token-key': TOKEN }
    });
  };