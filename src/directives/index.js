// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
  install(app) {
    // 懒加载指令逻辑
    app.directive("img-lazy", {
      // el 指令绑定的元素 img
      // binding  指令等于号后面绑定的表达式的值  图片url
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            console.log(isIntersecting);
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
