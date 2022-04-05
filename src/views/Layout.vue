<template>
  <div class="layout">
    <!-- 顶通栏 -->
    <AppTopNav />
    <!-- 头部导航栏 -->
    <AppHeader />
    <!-- 吸顶导航栏 -->
    <AppHeaderSticky />
    <!-- 二级路由 -->
    <RouterView />
  </div>
</template>

<script>
import AppTopNav from "@/components/app-topnav";
import AppHeader from "@/components/app-header";
import AppHeaderSticky from "@/components/app-header-sticky"
export default {
  name: "LayoutPage",
  components: { AppTopNav, AppHeader, AppHeaderSticky },
};
</script>

<style scoped lang='less'>
.layout{
  position: relative;
}

</style>
