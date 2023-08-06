// 封装分类数据业务相关代码
import { getTopCategoryAPI } from "@/apis/category";
import { onMounted, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

export function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCateforyDate = async (id = route.params.id) => {
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.result;
  };

  onMounted(() => {
    getCateforyDate();
  });

  onBeforeRouteUpdate((to) => {
    console.log("路由变化");
    getCateforyDate(to.params.id);
  });

  return {
    categoryData,
  };
}
