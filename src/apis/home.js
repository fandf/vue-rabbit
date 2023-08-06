import request from "@/utils/http";

/**
 * 获取banner
 */
export function getBannerAPI(params = {}) {
  const { distributionSite = "1" } = params;
  return request({
    url: "home/banner",
    params: {
      distributionSite,
    },
  });
}

/**
 * 获取新鲜好物
 */
export function findNewAPI() {
  return request({
    url: "home/new",
  });
}

/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export function getHotAPI() {
  return request({
    url: "home/hot",
  });
}

/**
 * @description: 获取所有商品模块
 * @param {*}
 * @return {*}
 */
export const getGoodsAPI = () => {
  return request({
    url: "/home/goods",
  });
};
