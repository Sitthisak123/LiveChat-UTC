import axios from 'axios';
const host_adr = 'localhost';


export const API_Login = axios.create({
  baseURL: `http://${host_adr}:9001/API/user/login`,
});
export const API_Register = () => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/register`,
  });
};
export const API_Init = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/init`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_getImage = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/getImage/`,
    responseType: 'arraybuffer',
    headers: { 'access-token-key': TOKEN }
  });
}
export const API_UploadProfileImage = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/upload/ProfileImage`,
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token-key': TOKEN
    }
  });
}
 