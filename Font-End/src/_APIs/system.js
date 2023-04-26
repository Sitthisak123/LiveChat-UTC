import axios from 'axios';
const host_adr = `${process.env.REACT_APP_API}`;
export const API_ChangeName = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/name`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeRelations = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/relations`,
    headers: { 'access-token-key': TOKEN }
  });
};

export const API_RequestFriend = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/create/relations`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ForgotPassword = () => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/Services/ForgotPassword`,
  });
};

export const API_ChangePassword = () => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/Services/ChangePassword`,
  });
};

export const API_verifyCode_reSend = () => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/Services/register-resend-verifyCode`,
  });
};

export const API_verifyEmail = () => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/Services/register-verify`,
  });
};
export const API_ChangePhoneNum = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/phoneNumber`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ConfigID = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/CustomID`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeEmail = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/Email`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_VerifyChangeEmail = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/Email-verify`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeMessageStatus = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/MessageStatus`,
    headers: { 'access-token-key': TOKEN }
  });
};
export const API_ChangeChatStatus = (TOKEN) => {
  return axios.create({
    baseURL: `http://${host_adr}/API/user/update/ChatStatus`,
    headers: { 'access-token-key': TOKEN }
  });
};