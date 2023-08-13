import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./userStore";
import { addCartAPI, findNewCartListAPI, delCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const userStore = useUserStore();
    // 是否登录
    const isLogin = computed(() => userStore.userInfo.token);

    const cartList = ref([]);

    // 获取最新购物车列表action
    const updateNewList = async () => {
      const res = await findNewCartListAPI();
      cartList.value = res.result;
    };

    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        await addCartAPI({ skuId, count });
        updateNewList();
      } else {
        // 添加购物车 已添加 count++  没有添加过 直接push
        const item = cartList.value.find((item) => goods.skuId === item.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId]);
        updateNewList();
      } else {
        const idx = cartList.value.findIndex((item) => skuId === item.skuId);
        cartList.value.splice(idx, 1);
      }
    };
    // 清除购物车
    const clearCart = () => {
      cartList.value = [];
    };

    const allCount = computed(() =>
      cartList.value.reduce((a, c) => a + c.count, 0)
    );

    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.count * c.price, 0)
    );

    // 购物车单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected));

    // 全选
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    // 已选择数量
    const selectedCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count, 0)
    );
    // 已选择价格
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.count * c.price, 0)
    );

    return {
      cartList,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      isAll,
      allCheck,
      clearCart,
      updateNewList,
    };
  },
  {
    persist: true,
  }
);
