<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <AppHeaderNav />
      <div class="cart">
        <a href="#" class="curr">
          <i class="iconfont icon-cart"></i>
          <em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import AppHeaderNav from "@/components/app-header-nav";
export default {
  name: "AppHeader",
  components: { AppHeaderNav },
};
</script>

<style scoped lang="less">
.app-header {
  background: #fff;
  .container {
    display: flex;
    // justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/reward.png") no-repeat center 18px /
        contain;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart {
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 3px 6px;
        line-height: 1;
        background: red;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        font-family: Arial;
      }
    }
  }
}
</style>
