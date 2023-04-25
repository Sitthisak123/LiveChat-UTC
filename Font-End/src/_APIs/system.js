import axios from 'axios';
const host_adr = 'localhost';
export const API_ChangeName = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/name`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeRelations = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/relations`,
    headers: { 'access-token-key': TOKEN }
  });
};

export const API_RequestFriend = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/create/relations`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ForgotPassword = () => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/Services/ForgotPassword`,
  });
};

export const API_ChangePassword = () => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/Services/ChangePassword`,
  });
};

export const API_verifyCode_reSend = () => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/Services/register-resend-verifyCode`,
  });
};

export const API_verifyEmail = () => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/Services/register-verify`,
  });
};
export const API_ChangePhoneNum = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/phoneNumber`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ConfigID = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/CustomID`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeEmail = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/Email`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_VerifyChangeEmail = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/Email-verify`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeMessageStatus = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/MessageStatus`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeChatStatus = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}:9001/API/user/update/ChatStatus`,
    headers: { 'access-token-key': TOKEN }
  });
};