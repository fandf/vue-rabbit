<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
  <HomePanel title="新鲜好物" sub-title="好多商品啊">
    <div>
      我是新鲜好污的插槽
    </div>
  </HomePanel>
  <HomePanel title="人机推荐" sub-title="好多推荐啊">
    <div>
      我是人机推荐的插槽
    </div>
  </HomePanel>
</template>