import axios from 'axios';
const host_adr = 'localhost';
export const API_GetAllUser = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}:9001/API/admin/GetAllUser`,
      headers: { 'access-token-key': TOKEN }
    });
  };
export const API_User_validate = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}:9001/API/admin/User-validate`,
      headers: { 'access-token-key': TOKEN }
    });
  };
  export const API_Delete_User = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}:9001/API/admin/Delete-User`,
      headers: { 'access-token-key': TOKEN }
    });
  };