<template>
  <div class="home-banner">
    <div class="container">
      <!-- banner -->
      <PkkCarousel />
      <!-- 搜索栏 -->
      <PkkSearch />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBanner",
};
</script>

<style scoped lang="less">
.home-banner {
  width: 100%;
  height: 420px;
  z-index: 98;
  .container{
    width: 100%;
    position: relative;
  }
}
</style>
