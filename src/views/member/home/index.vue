<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏"></HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹"></HomePanel>
  </div>
</template>
<script>
import HomeOverview from "./components/home-overview";
import HomePanel from "./components/home-panel";
export default {
  name: "MemberHome",
  components: {
    HomeOverview,
    HomePanel,
  },
  setup() {
    const goods = {
      id: "1",
      name: "自煮火锅不排队 麦饭石不粘鸳鸯火锅",
      picture:
        "https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg",
      desc: "清汤鲜香 红汤劲爽",
      price: "159.00",
    };
    return { goods };
  },
};
</script>
<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
