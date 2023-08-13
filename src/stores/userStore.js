import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({});
    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
    };

    //退出登录
    const clearUserInfo = () => {
      userInfo.value = {};
      const cartStore = useCartStore();
      cartStore.clearCart();
    };

    // 3. 以对象的格式把state 和 action 返回
    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);