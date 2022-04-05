<template>
  <div class="home-products">
    <div class="container">
      <div class="title">
        <p>最新推荐</p>
        <p>最新课程推荐展示，精彩近在咫尺</p>
      </div>
      <div class="products-content">
        <ul class="content">
          <li v-for="(val, index) in productList.slice(0, 12)" :key="index">
            <PkkItemCol :item="val" />
          </li>
        </ul>
      </div>
      <PkkPagination @current-change="changePager" :total="total" :currentPage="1" />
    </div>
  </div>
</template>

<script>
import { getAllProduct } from "@/api/home.js";
import { reactive, ref } from "vue";
export default {
  name: "HomeProducts",
  setup() {
    const productList = ref([]); //记录所有商品信息
    const total = ref(0); //记录总条数

    getAllProduct().then((res) => {
      // console.log("then内部的res", res.list);
      productList.value = res.list;
      total.value = res.list.length;
    });
    // console.log("then外部的productList", productList);

  // 改变分页函数
    const changePager = (np) => {
      // 改变页数
    }
    return { productList, total, changePager };
  },
};
</script>

<style scoped lang="less">
.home-products {
  margin: 30px auto;
}
.products-content {
  overflow: hidden;
}
.container {
  .title {
    margin-bottom: 20px;
    padding-left: 15px;
    p {
      display: inline-block;
      margin-right: 10px;
    }
    :first-child {
      font-size: 26px;
    }
  }
  .content {
    float: left;
    padding: 0 auto;
    li {
      display: inline-block;
      margin: 0 16px;
    }
  }
}
</style>
