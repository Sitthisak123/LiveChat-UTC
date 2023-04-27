import axios from 'axios';
const host_adr = process.env.REACT_APP_API;
export const API_GetAllUser = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}/API/admin/GetAllUser`,
      headers: { 'access-token-key': TOKEN }
    });
  };
export const API_User_validate = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}/API/admin/User-validate`,
      headers: { 'access-token-key': TOKEN }
    });
  };
  export const API_Delete_User = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}/API/admin/Delete-User`,
      headers: { 'access-token-key': TOKEN }
    });
  };
  export const API_Update_User = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}/API/admin/Update-User`,
      headers: { 'access-token-key': TOKEN }
    });
  };
  export const API_Ban_User = (TOKEN) => {
    return axios.create({
      baseURL: `http://${host_adr}/API/admin/Suspend-User`,
      headers: { 'access-token-key': TOKEN }
    });
  };