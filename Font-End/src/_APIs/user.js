import axios from 'axios';
const host_adr = `${process.env.REACT_APP_API}`;

export const API_Login = axios.create({
  baseURL: `http://${host_adr}/API/user/login`,
});
export const API_Register = () => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/register`,
  });
};
export const API_Init = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/init`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_getImage = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/getImage/`,
    responseType: 'arraybuffer',
    headers: { 'access-token-key': TOKEN }
  });
}
export const API_getOtherUsersImage = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/get-OtherUserImage`,
    headers: { 'access-token-key': TOKEN }
  });
}

export const API_UploadProfileImage = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/upload/ProfileImage`,
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'multipart/form-data',
      'access-token-key': TOKEN
    }
  });
}
export const API_FindByUnique = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/FindByUnique`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_NewChat = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/NewChat`,
    headers: { 'access-token-key': TOKEN }
  });
};
