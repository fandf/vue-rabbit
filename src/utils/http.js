// axios基础封装

import axios from "axios";

const request = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (e) => Promise.reject(e)
);

request.interceptors.response.use(
  (res) => res.data,
  (e) => Promise.reject(e)
);
export default request;
