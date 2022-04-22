<template>
  <div class="app-products">
    <div class="container">
      <div class="title" v-if="title&&subTitle">
        <p>{{title}}</p>
        <p>{{subTitle}}</p>
      </div>
      <div class="products-content">
        <ul class="content">
          <li v-for="(val, index) in productList.slice(0, 12)" :key="index">
            <RouterLink :to="'/product/' + val.pro_id">
              <PkkItemCol :item="val" />
            </RouterLink>
          </li>
        </ul>
      </div>
      <PkkPagination
        @current-change="changePager"
        :total="total"
        :currentPage="reqParams.page"
      />
    </div>
  </div>
</template>

<script>
import { getAllProduct, getProductByCateId } from "@/api/home.js";
import { reactive, ref, watch } from "vue";
export default {
  name: "AppProducts",
  props:{
    title:{
      type:String,
      default:"最新推荐"
    },
    subTitle:{
      type:String,
      default:"最新课程推荐展示，精彩近在咫尺"
    },
    categoryId:{
      type:Number,
      default:1001
    }
  },
  setup(props) {
    // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 12,
      // hasPicture: null,
      // tag: null,
      // sortField: null,
    });
    const productList = ref([]); //记录所有商品信息
    const total = ref(0); //记录总条数

    watch(
      reqParams,
      async () => {
        const data = await getProductByCateId(
          props.categoryId,
          reqParams.page,
          reqParams.pageSize
        );
        // console.log("data.list[0]___________", data.list[0]);
        //服务器返回两条结果，由数组包裹，具体log一下查看返回的结果
        //第一条结果在data.list[0]
        //第二条结果在data.list[1]，sql中count(0)取了别名total，所以结果总数在data.list[1][0].total
        productList.value = data.list[0];
        total.value = data.list[1][0].total;
      },
      { immediate: true }
    );

    // 改变分页函数
    const changePager = (np) => {
      // 改变页数
      reqParams.page = np;
    };

    return { reqParams, productList, total, changePager };
  },
};
</script>

<style scoped lang="less">
.app-products {
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
