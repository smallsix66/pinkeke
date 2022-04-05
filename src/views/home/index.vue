<template>
  <div class="home-entry">
    <div class="container">
      <!-- banner -->
      <HomeBanner class="banner" />
      <!-- 课程列表 -->
      <HomeProducts />
      <p v-for="i in 100" :key="i" style="fontsize: 36px">1</p>
    </div>
  </div>
</template>

<script>
import HomeBanner from "./components/home-banner.vue";
import HomeProducts from "./components/home-products.vue";
export default {
  name: "HomePage",
  components: { HomeBanner, HomeProducts },
};
</script>

<style scoped lang="less">
.home-entry {
  position: relative;
  .container {
    width: 100%;
    height: 100%;
    .banner {
    }
  }
}
</style>
