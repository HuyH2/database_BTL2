import axiosClient from './axiosClient';

const authApi = {
  login(data) {
    return axiosClient.post('/auth/login', data);
  },

  register(data) {
    return axiosClient.post('/auth/register', data);
  },

  checkEmail(data) {
    return axiosClient.post('/auth/check-email', data);
  },

  getMe() {
    return axiosClient.get('/auth/me');
  },

  resetPassword(data) {
    return axiosClient.post('/auth/reset-password', data);
  },

  logout() {
    return axiosClient.post('/auth/logout');
  }
};

export default authApi;