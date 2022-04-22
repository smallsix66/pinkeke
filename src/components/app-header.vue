<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">拼课课</RouterLink></h1>
      <!-- 分类导航栏 -->
      <AppHeaderNav />
      <!-- 购物车 -->
      <AppHeaderCart />
    </div>
  </header>
</template>

<script>
import AppHeaderNav from "@/components/app-header-nav";
import AppHeaderCart from "@/components/app-header-cart";
export default {
  name: "AppHeader",
  components: { AppHeaderNav, AppHeaderCart },
};
</script>

<style scoped lang="less">
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
    }
    background: url("@/assets/images/reward.png") no-repeat center 18px /
      contain;
  }
}
</style>
