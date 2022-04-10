<template>
  <div class="category-page">
    <div class="container">
      <!-- 面包屑 -->
      <PkkBread>
        <PkkBreadItem to="/">首页</PkkBreadItem>
        <PkkBreadItem :to="`/category/${categoryId}`">{{
          cateName
        }}</PkkBreadItem>
      </PkkBread>
      <!-- banner -->
      <PkkCarousel />
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-if="categoryId">
        <AppProducts :categoryId="categoryId" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick, tyepof } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import AppProducts from "@/components/app-products.vue";
export default {
  name: "TopCategory",
  components: { AppProducts },
  setup() {
    const store = useStore();
    //获取所有分类
    const categoryList = store.state.category.list;
    // console.log("categoryList",categoryList);

    //获取路由地址的id
    const route = useRoute();
    let categoryId = ref(0);

    //监听路由变化，重新渲染组件
    watch(
      () => route.params.id,
      (newVal) => {
        categoryId.value = null;
        nextTick(() => {
          // console.log("route.params.id", newVal);
          categoryId.value = newVal;
        });
      },
      { immediate: true }
    );

    //找对应分类id的分类名
    let cateName = computed(() => {
      let name = "";
      categoryList.forEach((e) => {
        if (route.params.id === "" + e.cate_id) {
          name = e.cate_name;
        }
      });
      return name;
    });

    return { categoryList, categoryId, cateName };
  },
};
</script>

<style scoped lang="less">
.category-page {
  .container {
    width: 100%;
  }
}
</style>
