<template>
  <div class="home-entry">
    <div class="container">
      <!-- banner -->
      <HomeBanner class="banner" />
      <!-- 商品列表 -->
      <AppProducts/>
    </div>
  </div>
</template>

<script>
import HomeBanner from "./components/home-banner.vue";
import AppProducts from "@/components/app-products.vue";
export default {
  name: "HomePage",
  components: { HomeBanner, AppProducts },
};
</script>

<style scoped lang="less">
.home-entry {
  position: relative;
  .container {
    width: 100%;
    height: 100%;
  }
}
</style>
