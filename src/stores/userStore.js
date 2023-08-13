import { loginAPI } from "@/apis/user";
import { mergeCartAPI } from "@/apis/cart";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useCartStore } from "./cartStore";

export const useUserStore = defineStore(
  "user",
  () => {
    // 1.定义管理用户数据的state
    const userInfo = ref({});

    const cartStore = useCartStore();

    // 2.定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password });
      userInfo.value = res.result;
      // 合并购物车
      mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      cartStore.updateNewList();
    };

    //退出登录
    const clearUserInfo = () => {
      userInfo.value = {};
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
