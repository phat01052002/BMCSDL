import axios from 'axios';

const HOST_BE = 'http://192.168.1.7:8055';
const api = axios.create({
  baseURL: HOST_BE
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      return Promise.resolve({
        status: 200,
        data: { success: false, message: '401' }
      });
    }
    if (response && response.status === 429) {
      // Thay đổi mã trạng thái thành 200 và trả về thông báo

      return Promise.resolve({
        status: 200,
        data: { success: false, message: 'MORE REQUEST' }
      });
    }

    // Kiểm tra mã trạng thái
    if (response && response.status === 409) {
      // Thay đổi mã trạng thái thành 200 và trả về thông báo

      return Promise.resolve({
        status: 200,
        data: { success: false, message: response.data.message }
      });
    }
    if (response && response.status === 502) {
      return Promise.resolve({
        status: 200,
        data: { success: false, message: '502' }
      });
    }
    if (response && response.status === 404) {
      window.location.href = '/err404';

      return Promise.resolve({
        status: 200,
        data: { success: false, message: '404' }
      });
    }
    if (response && response.status === 403) {
      return Promise.resolve({
        status: 200,
        data: { success: false, message: '403' }
      });
    }
    if (response && response.status === 500) {
      return Promise.resolve({
        status: 200,
        data: { success: false, message: '500' }
      });
    }
    // Trả lại lỗi cho các mã trạng thái khác
    return Promise.reject(error);
    // return Promise.resolve({
    //     status: 200,
    //     data: { success: false, message: 'err' },
    // });
  }
);
export const GetGuestApi = (url: string, data?: any) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${HOST_BE}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data ? data : {}
  };

  return api.request(config);
};
export const PostGuestApi = (url: string, data: object) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${HOST_BE}${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return api.request(config);
};
export const GetApi = (url: string, token: string | null, data?: any) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${HOST_BE}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: data ? data : {}
  };

  return api.request(config);
};

export const PostApi = (url: string, token: string | null, data: any) => {
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${HOST_BE}${url}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    data: data
  };

  return api.request(config);
};
