<template>
  <div class="admin-page">
    <div class="container">
      <!-- 面包屑 -->
      <PkkBread>
        <PkkBreadItem to='/'>订单管理</PkkBreadItem>
        <PkkBreadItem>查询</PkkBreadItem>
      </PkkBread>

    </div>
  </div>
</template>

<script>
import PkkBread from "@/components/library/pkk-bread.vue";
import PkkBreadItem from "@/components/library/pkk-bread-item.vue";
export default {
  name: "AdminPage",
  components: {
    PkkBread,
    PkkBreadItem,
  },
};
</script>

<style lang="less" scoped>
</style>
