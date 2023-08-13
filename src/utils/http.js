// axios基础封装

import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserStore } from "@/stores/userStore";
import router from "@/router";

const request = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});

// 拦截器
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (e) => Promise.reject(e)
);

request.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({
      type: "warning",
      message: e.response.data.message,
    });
    if (e.response.status === 401) {
      const userStore = useUserStore();
      userStore.clearUserInfo();
      router.push("/login");
    }
    return Promise.reject(e);
  }
);

export default request;
